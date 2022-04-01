package com.ssafy.handtohand.domain.model.dto.sale.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 구매 정보 업데이트 DTO
 *
 * @author EungChol Kim
 * created on 2022-04-01
 */

@ApiModel(value = "구매 정보 업데이트")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyerUpdateRequest {

    /* 구매자 주소 */
    @ApiModelProperty(value = "구매자 주소", required = true)
    private String buyerAddress;

}
