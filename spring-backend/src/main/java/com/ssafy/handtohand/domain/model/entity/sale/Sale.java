package com.ssafy.handtohand.domain.model.entity.sale;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 적금 내역 엔티티
 *
 * @author eungchol Kim
 * created on 2022-03-30
 */

@Entity
@Table(name="sales")
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sale_seq")
    /* 판매 키 */
    private Long seq;

    @Column(name="sale_contract_address")
    /* 판매 거래주소 */
    private String contractAddress;

    @Setter
    @Column(name="sale_yn")
    /* 판매 여부 */
    private int yn;

    @Column(name="sale_cash_contract_address")
    /* 판매완료 거래주소 */
    private String cashContractAddress;

    @Column(name="sale_seller_address")
    /* 판매자 지갑주소 */
    private String sellerAddress;

    @Setter
    @Column(name="sale_buyer_address")
    /* 구매자 지갑주소 */
    private String buyerAddress;

    @CreatedDate
    @Column(name="sale_created_at")
    /* 판매 생성일자 */
    private LocalDateTime createdAt;

    @Setter
    @CreatedDate
    @Column(name="sale_completed_at")
    /* 판매 완료일자 */
    private LocalDateTime completedAt;

    @Column(name="sale_start_time")
    /* 판매 시작시간 */
    private long startTime;

    @Column(name="sale_end_time")
    /* 판매 종료시간 */
    private long endTime;

    @JoinColumn(name="fk_item_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    /* 작품 키 */
    private Item item;

}
