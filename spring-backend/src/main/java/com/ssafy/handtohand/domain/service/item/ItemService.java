package com.ssafy.handtohand.domain.service.item;

import com.ssafy.handtohand.domain.model.dto.item.response.ItemResponse;
import com.ssafy.handtohand.domain.model.dto.item.requset.RequestItem;
import com.ssafy.handtohand.domain.model.entity.item.Item;
import com.ssafy.handtohand.domain.repository.item.ItemRepository;
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
    private EntityManager em;

    public List<ItemResponse> getItemList(String address){
        List<ItemResponse> list = new ArrayList<>();

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
