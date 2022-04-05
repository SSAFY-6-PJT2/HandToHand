package com.ssafy.handtohand.domain.service.user;

import com.ssafy.handtohand.domain.model.entity.user.User;
import com.ssafy.handtohand.domain.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * 회원 관련 기능 Service
 *
 * @author Eunee Chung
 * created on 2022-03-31
 */
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String insertUser(String address) {
        try {
            User user = userRepository.findUserByWalletAddress(address);
            if (user != null) return "이미 등록된 회원입니다";
            user = User.builder().address(address).build();
            userRepository.save(user);
            return "회원 등록이 완료되었습니다.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error";
        }
    }

    public String updateNickname(String nickname, String address) {
        try {
            User user = userRepository.findUserByWalletAddress(address);
            user.setNickname(nickname);
            userRepository.save(user);
            return "닉네임 수정이 완료되었습니다.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error";
        }
    }

    public String getNickname(String address) throws Exception {
        try {
            User user = userRepository.findUserByWalletAddress(address);
            return user.getNickname();
        } catch (Exception e) {
            throw new Exception("등록되지 않은 지갑 주소입니다.");
        }
    }
}
