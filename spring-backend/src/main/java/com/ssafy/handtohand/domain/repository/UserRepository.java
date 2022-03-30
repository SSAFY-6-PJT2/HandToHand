package com.ssafy.handtohand.domain.repository;

import com.ssafy.handtohand.domain.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByWalletAddress(String address);
}