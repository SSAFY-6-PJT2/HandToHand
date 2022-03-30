package com.ssafy.handtohand.domain.model.entity.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

/**
 * 유저 엔티티
 *
 * @author eunee chung
 * created on 2022-03-30
 */
@Entity
@Table(name = "users")
@Getter
@DynamicInsert
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long seq;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_wallet_address")
    private String walletAddress;
}
