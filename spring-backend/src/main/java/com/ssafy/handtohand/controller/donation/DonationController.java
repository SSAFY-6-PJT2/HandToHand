package com.ssafy.handtohand.controller.donation;

import com.ssafy.handtohand.domain.model.dto.donation.RequestDonationInfo;
import com.ssafy.handtohand.domain.service.donation.DonationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags="기부 내역 관련 기능")
@RestController
@RequestMapping("donations")
public class DonationController {
    private final DonationService donationService;

    @Autowired
    public DonationController(DonationService donationService){
        this.donationService=donationService;
    }

    @PostMapping("donation")
    @ApiOperation(value = "기부 내역 추가")
    public ResponseEntity<Integer> addDonation(@ApiParam(value = "기부 내역 정보", required = true) @RequestBody RequestDonationInfo request){
        return new ResponseEntity<>(donationService.insertDonationHistory(request), HttpStatus.OK);
    }

}
