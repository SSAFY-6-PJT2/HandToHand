package com.ssafy.handtohand.domain.model.dto.sale.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

/**
 * 없는 request값일 때
 *
 * @author EungChol Kim
 * created on 2022-04-05
 */

@ApiModel(value = "없는 값 일때 false 보내는 Resp")
@Getter
@Builder
public class SaleEmptyResponse {

    /* 찾는 값이 없습니다 */
    @ApiModelProperty(value = "찾는 값이 업습니다",required = true)
    private boolean noValue = false;
}
