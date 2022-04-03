package com.ssafy.handtohand.domain.model.dto.item.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

/**
 * 작품 응답 DTO
 *
 * @author SeungYeon Hwang
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


}
