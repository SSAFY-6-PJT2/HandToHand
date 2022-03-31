package com.ssafy.handtohand.domain.model.entity.item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import static javax.persistence.GenerationType.*;

@Entity
@Getter
@Table(name = "items")
@DynamicInsert
@NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name="item_seq")
    /* 작품 키 */
    private Long seq;

    @Column(name="item_hash")
    /* 작품 이미지 */
    private String hash;

    @Column(name="token_id")
    /* 작품 NFT 주소 */
    private String tokenId;

    @Column(name="title")
    /* 작품 이름 */
    private String title;

    @Column(name="owner_address")
    /* 소유자 지갑주소 */
    private String ownerAddress;

    @Column(name="on_sale_yn")
    /* 판매 중인지 여부 */
    private int onSaleYn;

    @Column(name="price")
    /* 작품현재가격 */
    private double price;

    @Column(name="like_count")
    /* 작품 좋아요 수 */
    private int likeCount;

}

