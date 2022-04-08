package com.ssafy.handtohand.domain.service.item;

import com.ssafy.handtohand.domain.model.dto.item.response.ItemDetailResponse;
import com.ssafy.handtohand.domain.model.dto.item.response.ItemResponse;
import com.ssafy.handtohand.domain.model.dto.item.requset.ItemRequest;
import com.ssafy.handtohand.domain.model.entity.donation.Donation;
import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.model.entity.user.User;
import com.ssafy.handtohand.domain.repository.donation.DonationRepository;
import com.ssafy.handtohand.domain.repository.item.ItemRepository;
import com.ssafy.handtohand.domain.service.like.LikeRepository;
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
//    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final DonationRepository donationRepository;
    private EntityManager em;

    public List<ItemResponse> getItemList(){
        List<ItemResponse> list = new ArrayList<>();

        List<Item> items = itemRepository.findAll();
        for(Item item: items){
            if(item.getDonation().getUser()==null) continue;
            ItemResponse itemResponse = ItemResponse.builder()
                    .seq(item.getSeq())
                    .hash(item.getHash())
                    .tokenId(item.getTokenId())
                    .title(item.getTitle())
                    .ownerAddress(item.getOwnerAddress())
                    .onSaleYn(item.getOnSaleYn())
                    .price(item.getPrice())
                    .likeCount(item.getLikeCount())
                    .donator(item.getDonation().getUser().getNickname())
                    .amountOfDonation(item.getDonation().getAmount())
                    .build();

            list.add(itemResponse);
        }

        return list;
    }

    public List<ItemResponse> getUserItemList(String address){
        List<ItemResponse> list = new ArrayList<>();

        List<Item> items = itemRepository.findByOwnerAddress(address);
        for(Item item: items){
            if(item.getDonation().getUser()==null) continue;
            ItemResponse itemResponse = ItemResponse.builder()
                    .seq(item.getSeq())
                    .hash(item.getHash())
                    .tokenId(item.getTokenId())
                    .title(item.getTitle())
                    .ownerAddress(item.getOwnerAddress())
                    .onSaleYn(item.getOnSaleYn())
                    .price(item.getPrice())
                    .likeCount(item.getLikeCount())
                    .donator(item.getDonation().getUser().getNickname())
                    .amountOfDonation(item.getDonation().getAmount())
                    .build();

            list.add(itemResponse);
        }

        return list;
    }

    public List<ItemResponse> getSaleItemList() {
        List<ItemResponse> list = new ArrayList<>();

        List<Item> items = itemRepository.findByOnSaleYn(1);
        for(Item item:items){
            if(item.getDonation().getUser()==null) continue;
            ItemResponse itemResponse = ItemResponse.builder()
                    .seq(item.getSeq())
                    .hash(item.getHash())
                    .tokenId(item.getTokenId())
                    .title(item.getTitle())
                    .ownerAddress(item.getOwnerAddress())
                    .onSaleYn(item.getOnSaleYn())
                    .price(item.getPrice())
                    .likeCount(item.getLikeCount())
                    .donator(item.getDonation().getUser().getNickname())
                    .amountOfDonation(item.getDonation().getAmount())
                    .build();

            list.add(itemResponse);
        }
        return list;
    }

    public String insertItem(ItemRequest request){
        try{
            Item item = ItemRequest.convertToEntity(request);
            item.setDonation(donationRepository.findBySeq(request.getDonationSeq()));
            itemRepository.save(item);
            item.setTitle("HandToHand#"+item.getSeq());
            return "success";
        }catch (Exception e){
            return "error";
        }
    }

    public String updateOwner(ItemRequest request){
        try{
            Item item = itemRepository.findByTokenId(request.getTokenId());
            item.setOwnerAddress(request.getOwnerAddress());

            return "success";
        }catch (Exception e){
            return "error";
        }
    }
    public ItemDetailResponse getItemDetails(String tokenId){
        try{
            Item item = itemRepository.findByTokenId(tokenId);
            ItemResponse response = ItemResponse.convertToDto(item);
//            Donation donationInfo = donationRepository.findDonationByItemEquals(item);
            Donation donationInfo = item.getDonation();
            User user = donationInfo.getUser();
            ItemDetailResponse detailResponse = new ItemDetailResponse(response,user.getNickname(),donationInfo.getAmount(),donationInfo.getSeq());
            return detailResponse;
        }catch (Exception e){
            System.out.println(e.getCause());
            System.out.println(e.getMessage());
            return null;
        }
    }
}
