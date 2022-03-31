package com.ssafy.handtohand.domain.service.sale;

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

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SaleService {

    private SaleRepository saleRepository;
    private ItemRepository itemRepository;
    private EntityManager em;

    /**
     * 판매 등록 추가
     *
     * @param request
     */
    @Transactional(rollbackFor = Exception.class)
    public void insertSale(SaleRequest request) {
        Sale sale = Sale.builder()
                .contractAddress(request.getSaleContractAddress())
                .yn(request.getSaleYN())
                .cashContractAddress(request.getCashContractAddress())
                .sellerAddress(request.getSellerAddress())
                .buyerAddress(request.getBuyerAddress())
                .createdAt(request.getCreatedAt())
                .completedAt(request.getCompletedAt())
                .build();
        saleRepository.save(sale);
        em.refresh(em.merge(sale));
    }

    /**
     * 판매 정보 상세 조회
     *
     * @param tokenId
     * @return
     */

    public SaleInfoResponse getSaleDetail(String tokenId) {
        Item item = itemRepository.findByTokenId(tokenId);
        Sale sale = saleRepository.findByItem(item);
        return SaleInfoResponse.builder()
                .contractAddress(sale.getContractAddress())
                .yn(sale.getYn())
                .cashContractAddress(sale.getCashContractAddress())
                .sellerAddress(sale.getSellerAddress())
                .buyerAddress(sale.getBuyerAddress())
                .createdAt(sale.getCreatedAt())
                .completedAt(sale.getCompletedAt())
                .build();
    }
}
