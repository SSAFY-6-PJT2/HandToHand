package com.ssafy.handtohand.controller.sale;


import com.ssafy.handtohand.domain.service.sale.SaleService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    /**
     * 판매 정보 상세 조회
     *
     * @param
     */


    /**
     * 구매자 정보 업데이트
     *
     * @param
     */


    /**
     * 판매 취소
     *
     * @param
     */


    /**
     * 판매 완료
     *
     * @param
     */


}
