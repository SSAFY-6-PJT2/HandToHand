package com.ssafy.handtohand.domain.service.like;

import com.ssafy.handtohand.domain.model.entity.like.Like;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 좋아요 레포지토리
 *
 * @author SeungYeon Hwang
 * created on 2022-04-04
 */

public interface LikeRepository extends JpaRepository<Like, Long> {

    Like findByTokenIdAndUserSeq(String tokenId, Long seq);
}
