package com.ssafy.handtohand.domain.repository.donation;

import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<Donation, Long> {
}