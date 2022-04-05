package com.ssafy.handtohand.domain.repository.sale;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.model.entity.sale.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale,Long> {
    Sale findByItem(Item item);
}
