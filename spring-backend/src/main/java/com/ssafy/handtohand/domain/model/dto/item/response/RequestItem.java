package com.ssafy.handtohand.domain.model.dto.item.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@ApiModel(value = "작품 생성 요청 정보")
@Getter
public class RequestItem {

    /* 작품 이미지 */
    private String hash;

    /* 작품 NFT 주소 */
    private String tokenId;

    /* 작품 이름 */
    private String title;

    /* 소유자 지갑주소 */
    private String ownerAddress;

}
