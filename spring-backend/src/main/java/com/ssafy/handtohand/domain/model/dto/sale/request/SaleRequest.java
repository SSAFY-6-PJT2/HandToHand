package com.ssafy.handtohand.domain.model.dto.sale.request;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

    /* NFT 주소 */
    @ApiModelProperty(value = "NFT 주소", required = true)
    private String tokenId;

    /* 판매 거래주소 */
    @ApiModelProperty(value = "판매 컨트랙트 주소", required = true)
    private String saleContractAddress;

    /* 거래완료 거래주소 */
    @ApiModelProperty(value = "거래완료 컨트랙트 주소",required = true)
    private String cashContractAddress;

    /* 판매자 지갑주소 */
    @ApiModelProperty(value = "판매자 지갑 주소",required = true)
    private String sellerAddress;

}
