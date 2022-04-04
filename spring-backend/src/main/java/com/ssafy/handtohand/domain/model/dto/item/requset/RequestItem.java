package com.ssafy.handtohand.domain.model.dto.item.requset;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import io.swagger.annotations.ApiModel;
import lombok.Getter;

/**
 * 작품 요청 정보 DTO
 *
 * @author Eunee Chung
 * created on 2022-04-01
 */
@ApiModel(value = "작품 요청 정보")
@Getter
public class RequestItem {

    /* 작품 이미지 */
    private String hash;

    /* 작품 NFT 주소 */
    private String tokenId;

    /* 소유자 지갑주소 */
    private String ownerAddress;

    static public Item convertToEntity(RequestItem requestItem) {
        return Item.builder()
                .hash(requestItem.getHash())
                .tokenId(requestItem.getTokenId())
                .ownerAddress(requestItem.getOwnerAddress())
                .build();
    }
}
