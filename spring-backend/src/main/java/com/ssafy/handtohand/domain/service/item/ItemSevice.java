package com.ssafy.handtohand.domain.service.item;

import com.ssafy.handtohand.domain.model.dto.item.response.ItemResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 작품 관련 서비스
 *
 * @author SeungYeon Hwang,Eunee jung
 * created on 2022-04-01
 */

@Service
public class ItemSevice {

    public List<ItemResponse> getItemList(String address){
        List<ItemResponse> list = new ArrayList<>();

        return list;
    }
}
