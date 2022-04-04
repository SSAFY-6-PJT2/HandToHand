package com.ssafy.handtohand.domain.model.dto.item.requset;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 좋아요 업데이트 DTO
 *
 * @author Seungyeon Hwang
 * created on 2022-04-04
 */

@ApiModel(value = "좋아요 업데이트")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeRequest {

    /* 사용자 지갑주소 */
    @ApiModelProperty(value = "사용자 지갑주소")
    private String address;

    /* 작품 NFT 주소 */
    @ApiModelProperty(value = "작품 NFT 주소")
    private String tokenId;
}
