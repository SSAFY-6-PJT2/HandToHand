package com.ssafy.handtohand.domain.service.like;

import com.ssafy.handtohand.domain.model.dto.item.requset.LikeRequest;
import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.model.entity.like.Like;
import com.ssafy.handtohand.domain.model.entity.user.User;
import com.ssafy.handtohand.domain.repository.item.ItemRepository;
import com.ssafy.handtohand.domain.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 좋아요 서비스
 *
 * @author SeungYeon Hwang
 * created on 2022-04-04
 */

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LikeService {
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public void updateLike(LikeRequest likeRequest) {
        User user = userRepository.findUserByWalletAddress(likeRequest.getAddress());
        Like like = likeRepository.findByTokenIdAndUserSeq(likeRequest.getTokenId(),user.getSeq());

        Item item = itemRepository.findByTokenId(likeRequest.getTokenId());


        if(like!=null){
            item.changeLikeCount(false);
            likeRepository.delete(like);
            likeRepository.flush();
        }else{
            item.changeLikeCount(true);
            likeRepository.save(Like.builder()
                    .user(user)
                    .tokenId(likeRequest.getTokenId())
                    .build());
        }
        itemRepository.save(item);


    }
}
