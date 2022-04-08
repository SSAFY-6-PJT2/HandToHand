package com.ssafy.handtohand.domain.repository.user;

import com.ssafy.handtohand.domain.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * 회원 관련 기능 Repository
 *
 * @author Eunee Chung
 * created on 2022-03-31
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByWalletAddress(String address);
    User findUserBySeq(Long seq);
}