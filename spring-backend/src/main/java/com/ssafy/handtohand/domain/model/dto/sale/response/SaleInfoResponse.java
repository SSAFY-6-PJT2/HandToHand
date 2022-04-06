package com.ssafy.handtohand.domain.model.dto.sale.response;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 판매 정보 상세 조회
 *
 * @author EungChol Kim
 * created on 2022-03-30
 */
@ApiModel(value ="판매 정보 상세 조회")
@Getter
@Builder
public class SaleInfoResponse {

    /* 판매 거래주소 */
    @ApiModelProperty(value = "판매 컨트랙트 주소", required = true)
    private String contractAddress;

    /* 판매 여부 */
    @ApiModelProperty(value = "거래 성사 여부",required = true)
    private int yn;

    /* 구매 시 사용한 토큰의 주소 */
    @ApiModelProperty(value = "구매 시 사용한 토큰의 주소",required = true)
    private String cashContractAddress;

    /* 판매자 지갑주소 */
    @ApiModelProperty(value = "판매자 지갑 주소",required = true)
    private String sellerAddress;

    /* 구매자 지갑주소 */
    @ApiModelProperty(value = "구매자 지갑 주소",required = true)
    private String buyerAddress;

    /* 판매 생성일자 */
    @ApiModelProperty(value = "판매 생성일자",required = true)
    private LocalDateTime createdAt;

    /* 판매 완료일자 */
    @ApiModelProperty(value = "판매 종료일자",required = true)
    private LocalDateTime completedAt;

    /* 판매 시작시간 */
    @ApiModelProperty(value = "판매 시간시간",required = true)
    private long startTime;

    /* 판매 종료시간 */
    @ApiModelProperty(value = "판매 종료시간",required = true)
    private long endTime;

    /* 작품키 */
    @ApiModelProperty(value = "작품 키",required = true)
    private Item itemSeq;

}
