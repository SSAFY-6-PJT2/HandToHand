package com.ssafy.handtohand.domain.repository.donation;

import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import com.ssafy.handtohand.domain.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findDonationsByUserOrderByCreatedDateDesc(User user);
    Donation findDonationByTransactionHash(String hash);
}