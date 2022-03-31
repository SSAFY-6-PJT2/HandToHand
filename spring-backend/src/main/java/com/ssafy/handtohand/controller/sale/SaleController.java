package com.ssafy.handtohand.controller.sale;


import com.ssafy.handtohand.domain.model.dto.sale.request.SaleRequest;
import com.ssafy.handtohand.domain.model.dto.sale.response.SaleInfoResponse;
import com.ssafy.handtohand.domain.service.sale.SaleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("sale")
    @ApiOperation(value = "판매 정보 등록")
    public void registrationSale(@ApiParam(value ="판매 정보",required = true) @RequestBody SaleRequest request){
        saleService.insertSale(request);
    }

    /**
     * 판매 정보 상세 조회
     *
     * @param
     */
    @GetMapping("sale/{token_id}")
    @ApiOperation(value = "판매 정보 상세 조회")
    public ResponseEntity<SaleInfoResponse> viewSaleDetail(@ApiParam(value="판매 상세 정보",required = true) @PathVariable("token_id") String tokenId){
        return new ResponseEntity<>(saleService.getSaleDetail(tokenId), HttpStatus.OK);
    }

    /**
     * 구매자 정보 업데이트
     *
     * @param
     */
    @ApiOperation(value = "구매자 정보 업데이트")
    public void updateBuyerInfo(){

    }

    /**
     * 판매 취소
     *
     * @param
     */
    @ApiOperation(value = "판매 취소")
    public void cancelSale(){

    }

    /**
     * 판매 완료
     *
     * @param
     */
    @ApiOperation(value = "판매 완료")
    public void completeSale(){

    }

}
