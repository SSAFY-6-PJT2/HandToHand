package com.ssafy.handtohand.domain.model.dto.donation;

import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import com.ssafy.handtohand.domain.model.entity.donation.DonationStatusType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@ApiModel(value = "기부 내역 응답 정보")
@Getter
@Builder
public class ResponseDonation {

    private Double amount;

    private Date createdDate;

    @ApiModelProperty(value = "기부 상태(실패, 처리중, 송금완료, 생성완료)", required = true)
    private int type;

    private String transactionHash;


    static public ResponseDonation convertToDto(Donation donation){
        return ResponseDonation.builder().amount(donation.getAmount())
                .createdDate(donation.getCreatedDate())
                .type(donation.getType().ordinal())
                .transactionHash(donation.getTransactionHash()).build();
    }
}
