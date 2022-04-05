// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/IERC20.sol";
import "./token/ERC721/IERC721.sol";

// Openzeppelin 라이브러리 사용
// import "./openzeppelin/contracts/access/Ownable.sol";
// import "./openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "./openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "./openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    address public admin;
    mapping(uint256 => address) public sales;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    event NewSaleCreated(
        address saleContractAddress,
        uint256 tokenId,
        address seller,
        uint256 saleStartTime,
        uint256 saleEndTime,
        address currencyAddress,
        uint256 minPrice,
        uint256 purchasePrice
    );

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor(
        address _currencyAddress,
        address _nftAddress
    ) {
        admin = msg.sender;

        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }

    function getSaleAddress(uint256 tokenId) public view returns (address) {
        return sales[tokenId];
    }
    // emit 필요성 확인
    function createSale(
        address seller,
        uint256 itemId,
        uint256 minPrice,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyAddress,
        address nftAddress
        )
        public
        returns (Sale newSaleContract)
    {
        erc20Contract = IERC20(currencyAddress);
        erc721Contract = IERC721(nftAddress);

        // seller 유효성 검사
        require(seller != address(0), "Not valid address");
        require(seller == erc721Contract.ownerOf(itemId), "Your not owner of this NFT");

        // seller 의 NFT Contract 로 이전
        erc721Contract.transferFrom(seller, address(this), itemId);

        newSaleContract = new Sale(
            admin,
            seller,
            itemId,
            minPrice,
            purchasePrice,
            startTime,
            endTime,
            currencyAddress,
            nftAddress
        );

        // Sacle Factory 의 NFT Sale Contract 로 이전
        erc721Contract.transferFrom(address(this), address(newSaleContract), itemId);

        sales[itemId] = address(newSaleContract);

        emit NewSaleCreated(address(newSaleContract), itemId, seller, startTime, endTime, currencyAddress, minPrice, purchasePrice);

        return newSaleContract;
    }

}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public saleStartTime;
    uint256 public saleEndTime;
    uint256 public minPrice;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    /*╔═════════════════════════════╗
      ║           EVENTS            ║
      ╚═════════════════════════════╝*/

    event BidMade(
        address saleContractAddress,
        uint256 tokenId,
        address bidder,
        uint256 amount,
        address currencyAddress
    );
    event SaleEnded(
        address saleContractAddress,
        uint256 tokenId,
        address winner,
        uint256 amount
    );

    /**********************************/
    /*╔═════════════════════════════╗
      ║             END             ║
      ║            EVENTS           ║
      ╚═════════════════════════════╝*/
    /**********************************/

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        tokenId = _tokenId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        saleStartTime = startTime;
        saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        highestBid = 0;
        highestBidder = address(0);
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }

    function bid(uint256 bid_amount)
        public
        notASeller
        isSaleOngoing
        returns (bool)
    {
        // bid 함수 조건
        address _bidder = msg.sender;
        require(erc20Contract.balanceOf(_bidder) >= bid_amount, "Bidder have not enough Token");
        require(erc20Contract.approve(_bidder, bid_amount), "Not approved for ERC20");
        require(bid_amount >= minPrice, "Your bid is lower than MinPrice");
        require(bid_amount > highestBid, "Your bid is lower than HighestBid");
        require(bid_amount < purchasePrice, "Your bid have to lower than Purchase Price");

        // 새로운 Highet bidder 등장에 따른 기존의 Highet bidder 환불
        if (highestBidder != address(0)) {
            erc20Contract.approve(address(this), highestBid);
            erc20Contract.transferFrom(address(this), highestBidder, highestBid);
        }

        // 새로운 Highet bidder 정보 update 및 bidder contract 로 송금
        erc20Contract.transferFrom(_bidder, address(this), bid_amount);
        highestBid = bid_amount;
        highestBidder = _bidder;

        emit BidMade(address(this), tokenId, _bidder, bid_amount, currencyAddress);

        return true;
    }

    function purchase()
        public
        notASeller
        isSaleOngoing
        returns (bool)
    {
        address _purchaser = msg.sender;
        require(erc20Contract.approve(_purchaser, purchasePrice), "Not approved for ERC20");

        // Purchaser 등장에 따른 기존의 Highet bidder 환불
        if (highestBidder != address(0)) {
            erc20Contract.approve(address(this), highestBid);
            erc20Contract.transferFrom(address(this), highestBidder, highestBid);
        }

        // 구매자의 송금 (구매자 -> Contract -> 판매자)
        erc20Contract.transferFrom(_purchaser, address(this), purchasePrice);
        erc20Contract.approve(address(this), purchasePrice);
        erc20Contract.transferFrom(address(this), seller, purchasePrice);
        // NFT 소유권 이전
        erc721Contract.transferFrom(address(this), _purchaser, tokenId);

        // 컨트랙트의 거래 상태 Update
        _end();
        // Todo : 구매자 정보 업데이트

        emit SaleEnded(address(this), tokenId, _purchaser, purchasePrice);

        return true;
    }

    function confirmItem()
        public
        notASeller
        isSaleOver
        returns (bool)
    {
        address confirmer = msg.sender;
        require(confirmer != address(0), "address(0) is not allowed");
        require(confirmer == highestBidder, "Your not a Highest Bidder");

        // 최종 제안가 Seller 에게 송금
        erc20Contract.approve(address(this), highestBid);
        erc20Contract.transferFrom(address(this), seller, highestBid);
        // NFT 소유권 Highest Bidder 에게 이전
        erc721Contract.transferFrom(address(this), highestBidder, tokenId);
        
        // 컨트랙트 거래상태 Update
        _end();
        // 구매자 정보 Update

        emit SaleEnded(address(this), tokenId, confirmer, highestBid);

        return true;
    }
    
    function cancelSales()
        public
        returns (bool)
    {
        address requestor = msg.sender;
        require(requestor == admin || requestor == seller, "You do not have permission");

        // Sale cancel 에 따른 기존의 Highet bidder 환불
        if (highestBidder != address(0)) {
            erc20Contract.approve(address(this), highestBid);
            erc20Contract.transferFrom(address(this), highestBidder, highestBid);
        }

        // NFT 소유권 Seller 에게 재 이전
        erc721Contract.transferFrom(address(this), seller, tokenId);
        // Contract 거래상태 Update
        _end();

        emit SaleEnded(address(this), tokenId, address(0), 0);

        return true;
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(saleEndTime - block.timestamp);
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256 StartTime,
            uint256 EndTime,
            uint256 MinPrice,
            uint256 BuyNowPrice,
            uint256 TokenId,
            address HighestBidder,
            uint256 HighestBid,
            address CurrencyAddress,
            address NftAddress
        )
    {
        return (
            saleStartTime,
            saleEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns(address, uint256){
        return (
            highestBidder,
            highestBid
        );
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }
    // Sale Check Functions
    function _isSaleOngoing()
        internal
        view
        returns (bool)
    {
        //if the auctionEnd is set to 0, the auction is technically on-going, however
        //the minimum bid price (minPrice) has not yet been met.
        // 현재 시각이 Sale 가능시간이며, Sale 이 종료되지 않았을 시 True 반환
        return (block.timestamp >= saleStartTime &&
            block.timestamp < saleEndTime && !ended);
    }

    function _isSaleOver()
        internal
        view
        returns (bool)
    {
        //if the auctionEnd is set to 0, the auction is technically on-going, however
        //the minimum bid price (minPrice) has not yet been met.
        // 현재 시각이 Sale 가능시간이며, Sale 이 종료되지 않았을 시 True 반환
        return (block.timestamp > saleEndTime && !ended);
    }

    // function _ERC20Approve(address to, uint256 amount)
    //     internal
    //     view
    //     returns (bool)
    // {
    //     return (erc20Contract.approve(to, amount));
    // }

    /*╔═════════════════════════════╗
      ║          MODIFIERS          ║
      ╚═════════════════════════════╝*/

    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }

    modifier notASeller() {
        require(msg.sender != seller, "Sale: You are seller.");
        _;
    }

    modifier validAddress(address _address) {
        require(_address != address(0), "Not valid address");
        _;
    }

    modifier isSaleOngoing() {
        require(
            _isSaleOngoing(),
            "Sale: This sale is closed"
        );
        _;
    }

    modifier isSaleOver() {
        require(
            _isSaleOver(),
            "Sale: This sale is not over yet"
        );
        _;
    }

    // modifier ERC20Approve(address to, uint256 amount) {
    //     require(_ERC20Approve(to, amount), "Not approved for ERC20");
    //     _;
    // }
    /**********************************/
    /*╔═════════════════════════════╗
      ║             END             ║
      ║          MODIFIERS          ║
      ╚═════════════════════════════╝*/
    /**********************************/
}
