package com.ssafy.handtohand.controller.donation;

import com.ssafy.handtohand.domain.model.dto.donation.RequestDonationInfo;
import com.ssafy.handtohand.domain.model.dto.donation.RequestDonationStatus;
import com.ssafy.handtohand.domain.model.dto.donation.ResponseDonation;
import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import com.ssafy.handtohand.domain.service.donation.DonationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags="기부 내역 관련 기능")
@RestController
@RequestMapping("donations")
public class DonationController {
    private final DonationService donationService;

    @Autowired
    public DonationController(DonationService donationService){
        this.donationService=donationService;
    }

    @PostMapping()
    @ApiOperation(value = "기부 내역 추가")
    public ResponseEntity<Integer> addDonation(@ApiParam(value = "기부 내역 정보", required = true) @RequestBody RequestDonationInfo request){
        return new ResponseEntity<>(donationService.insertDonationHistory(request), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "본인의 기부 내역 조회")
    public ResponseEntity<List<ResponseDonation>> getDonations(@ApiParam(value = "기부자 지갑 주소", required = true) @RequestHeader("wallet-address") String address){
        return new ResponseEntity<>(donationService.getDonations(address),HttpStatus.OK);
    }

    @PatchMapping
    @ApiOperation(value = "기부 내역 상태 업데이트")
    public ResponseEntity<String> updateDonation(RequestDonationStatus request){
        return new ResponseEntity<>(donationService.updateDonations(request),HttpStatus.OK);
    }
}
