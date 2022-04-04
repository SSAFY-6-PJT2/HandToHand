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
    @ApiOperation(value = "등록된 모든 작품 조회")
    public ResponseEntity<List<ItemResponse>> viewItemList(){
        return new ResponseEntity<>(itemService.getItemList(), HttpStatus.OK);
    }

    @GetMapping("/{address}")
    @ApiOperation(value = "특정 주소가 보유한 작품 목록 조회")
    public ResponseEntity<List<ItemResponse>> viewUserItemList(@PathVariable("wallet-address") String address){
        return new ResponseEntity<>(itemService.getUserItemList(address), HttpStatus.OK);
    }

    @GetMapping("/onSale")
    @ApiOperation(value = "판매중인 작품 목록 조회")
    public ResponseEntity<List<ItemResponse>> viewSaleItemList(){
        return new ResponseEntity<>(itemService.getSaleItemList(), HttpStatus.OK);
    }

    @PatchMapping
    @ApiOperation(value = "좋아요 업데이트")
    public void updateLike(){
        itemService.updateLike();
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
