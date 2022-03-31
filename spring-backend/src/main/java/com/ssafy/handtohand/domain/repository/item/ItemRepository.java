package com.ssafy.handtohand.domain.repository.item;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    /**
     * 토큰 아이디로 NFT 조회
     * @param tokenId
     * @return
     */
//    Item findByItem_Token_Id(String tokenId);
    Item findByTokenId(String tokenId);

}
