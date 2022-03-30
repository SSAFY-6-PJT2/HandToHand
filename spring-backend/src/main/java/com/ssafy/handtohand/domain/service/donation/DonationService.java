package com.ssafy.handtohand.domain.service.donation;

import com.ssafy.handtohand.domain.model.dto.donation.RequestDonationInfo;
import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import com.ssafy.handtohand.domain.model.entity.user.User;
import com.ssafy.handtohand.domain.repository.UserRepository;
import com.ssafy.handtohand.domain.repository.donation.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class DonationService {
    private final DonationRepository donationRepository;
    private final UserRepository userRepository;

    @Autowired
    public DonationService(DonationRepository donationRepository, UserRepository userRepository) {
        this.donationRepository = donationRepository;
        this.userRepository = userRepository;
    }

    public int insertDonationHistory(RequestDonationInfo request) {
        try {
            Donation donation = Donation.builder()
                    .transactionHash(request.getTransactionHash())
                    .amount(request.getAmount())
                    .createdDate(new Date())
                    .build();
            User user = userRepository.findUserByWalletAddress(request.getWalletAddress());
            donation.setUser(user);
            donationRepository.save(donation);
            return 1;
        } catch (NullPointerException e) {

            return 0;
        }
    }
}
