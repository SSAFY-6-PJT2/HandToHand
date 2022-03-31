package com.ssafy.handtohand.controller.user;

import com.ssafy.handtohand.domain.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags="회원 관련 기능")
@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping
    @ApiOperation(value = "회원 추가")
    public ResponseEntity<String> addUser(@ApiParam(value = "회원 지갑 주소") @RequestHeader("wallet-address") String address){
        return new ResponseEntity<>(userService.insertUser(address), HttpStatus.OK);
    }
}
