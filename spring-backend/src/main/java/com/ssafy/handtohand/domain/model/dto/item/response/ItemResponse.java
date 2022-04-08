package com.ssafy.handtohand.domain.model.dto.item.response;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

/**
 * 작품 응답 DTO
 *
 * @author SeungYeon Hwang,Eunee Chung
 * created on 2022-04-03
 */

@ApiModel(value = "작품 응답 정보")
@Getter
@Builder
public class ItemResponse {

    /* 작품 키 */
    @ApiModelProperty(value = "작품 키", required = true)
    private long seq;

    /* 작품 이미지 */
    @ApiModelProperty(value = "작품 이미지", required = true)
    private String hash;

    /* 작품 NFT 주소 */
    @ApiModelProperty(value = "작품 NFT 주소", required = true)
    private String tokenId;

    /* 작품 이름 */
    @ApiModelProperty(value = "작품 이름", required = true)
    private String title;

    /* 소유자 지갑주소 */
    @ApiModelProperty(value = "소유자 지갑주소", required = true)
    private String ownerAddress;

    /* 판매 중인지 여부 */
    @ApiModelProperty(value = "판매 여부", required = true)
    private int onSaleYn;

    /* 작품현재가격 */
    @ApiModelProperty(value = "작품 가격", required = true)
    private double price;

    /* 작품 좋아요 수 */
    @ApiModelProperty(value = "작품 좋아요 수", required = true)
    private int likeCount;

    /* 기부자 아이디 */
    @ApiModelProperty(value = "기부자 닉네임", required = true)
    private String donator;

    /* 기부 금액 */
    @ApiModelProperty(value = "기부 금액", required = true)
    private double amountOfDonation;

    static public ItemResponse convertToDto(Item item) {
        return ItemResponse.builder()
                .seq(item.getSeq())
                .hash(item.getHash())
                .tokenId(item.getTokenId())
                .title(item.getTitle())
                .ownerAddress(item.getOwnerAddress())
                .onSaleYn(item.getOnSaleYn())
                .price(item.getPrice())
                .likeCount(item.getLikeCount())
                .build();
    }

}
