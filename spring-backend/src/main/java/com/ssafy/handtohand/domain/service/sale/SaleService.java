package com.ssafy.handtohand.domain.service.sale;

import com.ssafy.handtohand.domain.model.dto.sale.request.BuyerUpdateRequest;
import com.ssafy.handtohand.domain.model.dto.sale.request.SaleRequest;
import com.ssafy.handtohand.domain.model.dto.sale.response.SaleInfoResponse;
import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.model.entity.sale.Sale;
import com.ssafy.handtohand.domain.repository.item.ItemRepository;
import com.ssafy.handtohand.domain.repository.sale.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final ItemRepository itemRepository;

    /**
     * 판매 등록 추가
     *
     * @param request
     */
    @Transactional(rollbackFor = Exception.class)
    public void insertSale(SaleRequest request) {
        Item item = itemRepository.findByTokenId(request.getTokenId());
        item.setOnSaleYn(1);
        Sale sale = Sale.builder()
                .contractAddress(request.getSaleContractAddress())
                .yn(1)
                .cashContractAddress(request.getCashContractAddress())
                .sellerAddress(request.getSellerAddress())
                .buyerAddress("notYet")
                .createdAt(LocalDateTime.now())
                .completedAt(LocalDateTime.now())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .item(item)
                .build();
        saleRepository.save(sale);
    }

    /**
     * 판매 정보 상세 조회
     *
     * @param tokenId
     * @return
     */
    public SaleInfoResponse getSaleDetail(String tokenId) throws Exception {
        try {
            Item item = itemRepository.findByTokenId(tokenId);
            Sale sale = saleRepository.findTopByItemOrderBySeq(item);
            return SaleInfoResponse.builder()
                    .contractAddress(sale.getContractAddress())
                    .yn(sale.getYn())
                    .cashContractAddress(sale.getCashContractAddress())
                    .sellerAddress(sale.getSellerAddress())
                    .buyerAddress(sale.getBuyerAddress())
                    .createdAt(sale.getCreatedAt())
                    .completedAt(sale.getCompletedAt())
                    .startTime(sale.getStartTime())
                    .endTime(sale.getEndTime())
                    .build();
        }catch (Exception e){
            throw new Exception("유효하지 않은 TokenId입니다.");
        }
    }

    /**
     * 구매자 정보 업데이트
     *
     * @param request
     */
    public void updateBuyerInfo(BuyerUpdateRequest request, String tokenId) {
        Item item = itemRepository.findByTokenId(tokenId);
        Sale sale = saleRepository.findTopByItemOrderBySeq(item);
        sale.setBuyerAddress(request.getBuyerAddress());
    }

    /**
     * 판매 상태 취소로 업데이트
     *
     * @param tokenId
     */
    public void changeYNSale(String tokenId) {
        Item item = itemRepository.findByTokenId(tokenId);
        Sale sale = saleRepository.findTopByItemOrderBySeq(item);
        item.setOnSaleYn(0);
        sale.setYn(0);
        sale.setCompletedAt(LocalDateTime.now());
    }

    /**
     * 판매 상태 완료로 업데이트
     *
     * @param tokenId
     */
    public void changeSaleComplete(String tokenId) {
        Item item = itemRepository.findByTokenId(tokenId);
        Sale sale = saleRepository.findTopByItemOrderBySeq(item);
        item.setOnSaleYn(0);
        sale.setYn(0);
        sale.setCompletedAt(LocalDateTime.now());
    }
}
