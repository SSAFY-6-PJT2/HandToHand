// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counter.sol";
import "./access/Ownable.sol";
// import "./utils/Counter.sol";
// import "./openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "./openzeppelin/contracts/access/Ownable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("HandToHand", "B209") {
    }

    event NewToken(
        address _owner,
        uint256 _tokenId,
        string _tokenURI
    );
    
    function caller() public view returns (address) {
        return msg.sender;
    }

    function addressOfContract() public view returns (address) {
        return address(this);
    }

    function current() public view returns (uint256) {
        return Counters.current(_tokenIds);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();
        tokenURIs[_tokenIds.current()] = _tokenURI;
        uint256 newNFTId = _tokenIds.current();
        _mint(to, newNFTId);
        _setTokenURI(newNFTId, _tokenURI);

        emit NewToken(to, newNFTId, _tokenURI);

        return newNFTId;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override returns (bool) {
        // require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        // require(ERC721.ownerOf(tokenId) == msg.sender, "Your not a owner of this NFT");
        // _transfer(from, to, tokenId);
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);

        return true;
    }
}