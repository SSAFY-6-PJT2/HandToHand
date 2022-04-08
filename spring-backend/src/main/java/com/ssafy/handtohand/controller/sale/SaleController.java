package com.ssafy.handtohand.controller.sale;


import com.ssafy.handtohand.domain.model.dto.sale.request.BuyerUpdateRequest;
import com.ssafy.handtohand.domain.model.dto.sale.request.SaleRequest;
import com.ssafy.handtohand.domain.model.dto.sale.response.SaleInfoResponse;
import com.ssafy.handtohand.domain.service.sale.SaleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.module.ResolutionException;

/**
 * 판매 컨트롤러
 *
 * @author EungChol Kim
 * created on 2022-03-30
 */

@Api(tags = "판매")
@RestController
@RequestMapping("sales")
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;

    /**
     * 판매 정보 등록
     *
     * @param
     */
    @PostMapping("/")
    @ApiOperation(value = "판매 정보 등록")
    public void registrationSale(@ApiParam(value ="판매 정보",required = true) @RequestBody SaleRequest request){
        saleService.insertSale(request);
    }

    /**
     * 판매 정보 상세 조회
     *
     * @param
     */
    @GetMapping("{token_id}")
    @ApiOperation(value = "판매 정보 상세 조회")
    public ResponseEntity<SaleInfoResponse> viewSaleDetail(@ApiParam(value="판매 상세 정보",required = true) @PathVariable("token_id") String tokenId){
        try{
            return new ResponseEntity<>(saleService.getSaleDetail(tokenId), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    /**
     * 구매자 정보 업데이트
     *
     * @param
     */
    @PatchMapping("{token_id}/purchase")
    @ApiOperation(value = "구매자 정보 업데이트")
    public void updateBuyerInfo(@ApiParam(value = "구매자 정보 업데이트", required = true) @RequestBody BuyerUpdateRequest request, @PathVariable String token_id){
        saleService.updateBuyerInfo(request, token_id);
    }

    /**
     * 판매 취소
     *
     * @param
     */
    @PatchMapping("{token_id}")
    @ApiOperation(value = "판매 취소")
    public void cancelSale(@ApiParam(value = "판매 취소", required = true) @PathVariable String token_id){
        saleService.changeYNSale(token_id);
    }

    /**
     * 판매 완료
     *
     * @param
     */
    @PatchMapping("{token_id}/complete")
    @ApiOperation(value = "판매 완료")
    public void completeSale(@ApiParam(value = "판매 완료", required = true) @PathVariable String token_id){
        saleService.changeSaleComplete(token_id);
    }

}
