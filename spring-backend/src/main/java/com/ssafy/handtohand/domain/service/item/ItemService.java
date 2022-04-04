package com.ssafy.handtohand.domain.service.item;

import com.ssafy.handtohand.domain.model.dto.item.requset.LikeRequest;
import com.ssafy.handtohand.domain.model.dto.item.response.ItemResponse;
import com.ssafy.handtohand.domain.model.dto.item.requset.RequestItem;
import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.model.entity.like.Like;
import com.ssafy.handtohand.domain.model.entity.user.User;
import com.ssafy.handtohand.domain.repository.item.ItemRepository;
import com.ssafy.handtohand.domain.repository.like.LikeRepository;
import com.ssafy.handtohand.domain.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

/**
 * 작품 관련 서비스
 *
 * @author SeungYeon Hwang,Eunee Chung
 * created on 2022-04-01
 */

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private EntityManager em;

    public List<ItemResponse> getItemList(){
        List<ItemResponse> list = new ArrayList<>();

        List<Item> items = itemRepository.findAll();
        for(Item item: items){
            ItemResponse itemResponse = ItemResponse.builder()
                    .seq(item.getSeq())
                    .hash(item.getHash())
                    .tokenId(item.getTokenId())
                    .title(item.getTitle())
                    .ownerAddress(item.getOwnerAddress())
                    .onSaleYn(item.getOnSaleYn())
                    .price(item.getPrice())
                    .likeCount(item.getLikeCount())
                    .build();
            list.add(itemResponse);
        }

        return list;
    }

    public List<ItemResponse> getUserItemList(String address){
        List<ItemResponse> list = new ArrayList<>();

        List<Item> items = itemRepository.findByOwnerAddress(address);
        for(Item item: items){
            ItemResponse itemResponse = ItemResponse.builder()
                    .seq(item.getSeq())
                    .hash(item.getHash())
                    .tokenId(item.getTokenId())
                    .title(item.getTitle())
                    .ownerAddress(item.getOwnerAddress())
                    .onSaleYn(item.getOnSaleYn())
                    .price(item.getPrice())
                    .likeCount(item.getLikeCount())
                    .build();
            list.add(itemResponse);
        }

        return list;
    }

    public List<ItemResponse> getSaleItemList() {
        List<ItemResponse> list = new ArrayList<>();

        List<Item> items = itemRepository.findByOnSaleYn(1);
        for(Item item:items){
            ItemResponse itemResponse = ItemResponse.builder()
                    .seq(item.getSeq())
                    .hash(item.getHash())
                    .tokenId(item.getTokenId())
                    .title(item.getTitle())
                    .ownerAddress(item.getOwnerAddress())
                    .onSaleYn(item.getOnSaleYn())
                    .price(item.getPrice())
                    .likeCount(item.getLikeCount())
                    .build();
            list.add(itemResponse);
        }
        return list;
    }

    public String insertItem(RequestItem request){
        try{
            Item item = RequestItem.convertToEntity(request);
            itemRepository.save(item);
            item.setTitle("HandToHand#"+item.getSeq());
            return "success";
        }catch (Exception e){
            return "error";
        }
    }

    public String updateOwner(RequestItem request){
        try{
            Item item = itemRepository.findByTokenId(request.getTokenId());
            item.setOwnerAddress(request.getOwnerAddress());

            return "success";
        }catch (Exception e){
            return "error";
        }
    }
}
