package com.ssafy.handtohand.domain.model.entity.sale;

import com.ssafy.handtohand.domain.model.entity.item.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * 적금 내역 엔티티
 *
 * @author eungchol Kim
 * created on 2022-03-30
 */

@Entity
@Table(name="sales")
@Getter
@NoArgsConstructor
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sale_id")
    private Long seq;

    @Column(name="sale_contract_address")
    private String contract_address;

    @Column(name="sale_yn")
    private int yn;

    @Column(name="sale_cash_contract_address")
    private String cash_contract_address;

    @Column(name="sale_seller_address")
    private String seller_address;

    @Column(name="sale_buyer_address")
    private String buyer_address;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="sale_created_at")
    private Date created_at;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="sale_completed_at")
    private Date completed_at;

    @JoinColumn(name="fk_item_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Item item;

}
