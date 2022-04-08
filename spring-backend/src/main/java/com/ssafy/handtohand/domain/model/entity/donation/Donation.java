package com.ssafy.handtohand.domain.model.entity.donation;

import com.ssafy.handtohand.domain.model.entity.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

import static com.ssafy.handtohand.domain.model.entity.donation.DonationStatusType.처리중;

/**
 * 기부 앤티티
 *
 * @author eunee chung
 * created on 2022-03-30
 */
@Entity
@Table(name = "donations")
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_seq")
    private Long seq;

    @Column(name = "donation_amount")
    private Double amount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "donation_created_at")
    private Date createdDate;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(name = "donation_status_type")
    private DonationStatusType type;

    @Column(name = "donation_transaction_hash")
    private String transactionHash;


//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "fk_item_seq")
//    private Item item;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_seq")
    private User user;

    @Builder
    public Donation(Date createdDate,String transactionHash, double amount) {
        this.createdDate=createdDate;
        this.type=처리중;
        this.transactionHash = transactionHash;
        this.amount = amount;
    }
}
