// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counter.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("SsafyNFT", "SNFT") {
        // TODO
    }

    // function current() public view returns (uint256) {
    //     return _tokenIds;
    // }

    // function tokenURI(uint256 tokenId) public view returns (string memory) {
    //     // TODO
    // }

    function current() public view returns (uint256) {
        return Counters.current(_tokenIds);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newNFTId = _tokenIds.current();
        _mint(to, newNFTId);
        _setTokenURI(newNFTId, _tokenURI);

        return newNFTId;
    }
}