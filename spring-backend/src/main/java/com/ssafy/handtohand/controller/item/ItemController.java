package com.ssafy.handtohand.controller.item;

import com.ssafy.handtohand.domain.model.dto.item.response.ItemResponse;
import com.ssafy.handtohand.domain.service.item.ItemSevice;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 작품 관련 컨트롤러
 *
 * @author SeungYeon Hwang,Eunee jung
 * created on 2022-04-01
 */

@Api(tags = "작품 관련 기능")
@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemSevice itemService;

    @GetMapping
    public ResponseEntity<List<ItemResponse>> viewItemList(@RequestHeader("wallet-address") String address){

        return new ResponseEntity<>(itemService.getItemList(address), HttpStatus.OK);
    }
}
