package com.ssafy.handtohand.domain.model.entity.like;

import com.ssafy.handtohand.domain.model.entity.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

/**
 *  좋아요 Entity
 *
 * @author SeungYeon Hwang
 * created on 2022-04-04
 */

@Entity
@Table(name="likes")
@Getter
@DynamicInsert
@NoArgsConstructor
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likes_seq")
    private Long seq;

    @Column(name = "tokien_id")
    private String tokenId;

    @ManyToOne
    @JoinColumn(name = "fk_user_seq")
    private User user;

    @Builder
    public Like(String tokenId, User user){
        this.tokenId=tokenId;
        this.user=user;
    }

}
