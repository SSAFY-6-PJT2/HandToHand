package com.ssafy.handtohand.domain.model.dto.item.requset;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 작품 요청 정보 DTO
 *
 * @author Eunee Chung
 * created on 2022-04-01
 */
@ApiModel(value = "작품 요청 정보")
@Getter
public class ItemRequest {

    /* 작품 이미지 */
    @ApiModelProperty(value = "작품 이미지",required = true)
    private String imageUrl;

    /* 작품 NFT 주소 */
    @ApiModelProperty(value = "작품 NFT 주소",required = true)
    private String tokenId;

    /* 소유자 지갑주소 */
    @ApiModelProperty(value = "소유자 지갑주소",required = true)
    private String ownerAddress;

    /* 기부 내역 키 */
    @ApiModelProperty(value = "기부 내역 키",required = true)
    private Long donationSeq;

    static public Item convertToEntity(ItemRequest requestItem) {
        return Item.builder()
                .hash(requestItem.getImageUrl())
                .tokenId(requestItem.getTokenId())
                .ownerAddress(requestItem.getOwnerAddress())
                .build();
    }
}
