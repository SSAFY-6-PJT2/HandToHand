package com.ssafy.handtohand.domain.model.dto.donation.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

/**
 * 기부 내역 상태 업데이트 요청 정보 DTO
 *
 * @author Eunee Chung
 * created on 2022-03-31
 */
@ApiModel("기부 내역 상태 업데이트 요청 정보")
@Getter
@Builder
public class DonationStatusRequest {
    private String transactionHash;
    private int type;
}
