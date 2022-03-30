package com.ssafy.handtohand.domain.model.dto.sale.request;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * 판매 등록 정보 DTO
 *
 * @author EungChol Kim
 * created on 2022-03-30
 */

@ApiModel(value = "판매 등록 정보")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SaleRequest {

    /* 판매 거래주소 */
    @ApiModelProperty(value = "판매 컨트랙트 주소", required = true)
    private String saleContractAddress;

    /* 판매 여부 */
    @ApiModelProperty(value = "거래 성사 여부",required = true)
    private int saleYN;

    /* 거래완료 거래주소 */
    @ApiModelProperty(value = "거래완료 컨트랙트 주소",required = true)
    private String cashContractAddress;

    /* 판매자 지갑주소 */
    @ApiModelProperty(value = "판매자 지갑 주소",required = true)
    private String sellerAddress;

    /* 구매자 지갑주소 */
    @ApiModelProperty(value = "구매자 지갑 주소",required = true)
    private String buyerAddress;

    /* 판매 생성일자 */
    @ApiModelProperty(value = "판매 생성일자",required = true)
    private Date createdAt;

    /* 판매 종료일자 */
    @ApiModelProperty(value = "판매 종료일자",required = true)
    private Date completedAt;

    /* 작품키 */
    @ApiModelProperty(value = "작품 키",required = true)
    private Item itemSeq;
}
