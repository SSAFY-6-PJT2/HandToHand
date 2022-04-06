package com.ssafy.handtohand.domain.repository.sale;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.model.entity.sale.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale,Long> {
    /* item으로 판매 테이블 조회 */
    Sale findTopByItemOrderBySeq(Item item);

}
