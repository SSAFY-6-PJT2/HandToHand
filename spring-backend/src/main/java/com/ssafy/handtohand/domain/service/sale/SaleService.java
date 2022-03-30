package com.ssafy.handtohand.domain.service.sale;

import com.ssafy.handtohand.domain.model.dto.sale.request.SaleRequest;
import com.ssafy.handtohand.domain.model.entity.sale.Sale;
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
    private EntityManager em;

    /**
     * 판매 등록 추가
     *
     * @param request
     */
    @Transactional(rollbackFor = Exception.class)
    public void insertSale(SaleRequest request) {
        Sale sale = Sale.builder()
                .contract_address(request.getSaleContractAddress())
                .yn(request.getSaleYN())
                .cash_contract_address(request.getCashContractAddress())
                .seller_address(request.getSellerAddress())
                .buyer_address(request.getBuyerAddress())
                .created_at(request.getCreatedAt())
                .completed_at(request.getCompletedAt())
                .build();
        saleRepository.save(sale);
        em.refresh(em.merge(sale));
    }
}
