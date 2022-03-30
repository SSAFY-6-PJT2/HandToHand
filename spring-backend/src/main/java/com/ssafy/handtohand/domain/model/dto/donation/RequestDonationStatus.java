package com.ssafy.handtohand.domain.model.dto.donation;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel("기부 내역 상태 업데이트 요청 정보")
@Getter
@Builder
public class RequestDonationStatus {
    private String transactionHash;
    private int type;
}
