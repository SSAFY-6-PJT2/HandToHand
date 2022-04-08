package com.ssafy.handtohand.domain.model.dto.donation.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * 기부 내역 응답 정보 DTO
 *
 * @author Eunee Chung
 * created on 2022-03-31
 */
@ApiModel(value = "기부 내역 응답 정보")
@Getter
@Builder
public class DonationResponse {

    private Double amount;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private Date createdDate;

    @ApiModelProperty(value = "기부 상태(실패, 처리중, 송금완료, 생성완료)", required = true)
    private int type;

    private String transactionHash;

    private Long seq;

    static public DonationResponse convertToDto(Donation donation) {
        return DonationResponse.builder()
                .amount(donation.getAmount())
                .createdDate(donation.getCreatedDate())
                .type(donation.getType().ordinal())
                .transactionHash(donation.getTransactionHash())
                .seq(donation.getSeq()).build();
    }
}
