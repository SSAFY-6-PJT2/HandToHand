package com.ssafy.handtohand.controller.item;

import com.ssafy.handtohand.domain.model.dto.item.response.ItemResponse;
import com.ssafy.handtohand.domain.model.dto.item.requset.RequestItem;
import com.ssafy.handtohand.domain.service.item.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 작품 관련 컨트롤러
 *
 * @author SeungYeon Hwang,Eunee Chung
 * created on 2022-04-01
 */

@Api(tags = "작품 관련 기능")
@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<ItemResponse>> viewItemList(@RequestHeader("wallet-address") String address){

        return new ResponseEntity<>(itemService.getItemList(address), HttpStatus.OK);
    }

    @PostMapping("/add")
    @ApiOperation(value = "NFT 작품 생성")
    public ResponseEntity<String> addItem(@ApiParam(value = "NFT 관련 정보",required = true)@RequestBody RequestItem request){
        return new ResponseEntity<>(itemService.insertItem(request),HttpStatus.OK);
    }

    @PatchMapping("/update")
    @ApiOperation(value="NFT 소유자 변경")
    public ResponseEntity<String> updateOwner(@ApiParam(value = "NFT owner 변경 요청 정보",required = true)@RequestBody RequestItem request){
        return new ResponseEntity<>(itemService.updateOwner(request),HttpStatus.OK);
    }
}
