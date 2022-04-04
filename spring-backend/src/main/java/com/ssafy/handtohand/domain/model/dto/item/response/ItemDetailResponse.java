package com.ssafy.handtohand.domain.model.dto.item.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 작품 상세 응답 정보 DTO
 *
 * @author Eunee Chung
 * created on 2022-04-04
 */
@ApiModel(value = "작품 상세 응답 정보")
@Getter
@NoArgsConstructor
public class ItemDetailResponse {
    /* 작품 정보*/
    @ApiModelProperty(value = "작품 정보", required = true)
    public ItemResponse item;

    /* 기부자 정보 */
    @ApiModelProperty(value = "기부자 정보", required = true)
    public Donor donor;

    public ItemDetailResponse(ItemResponse item,String nickname, Double price, Long order ){
        this.donor = new Donor(nickname,price,order);
        this.item =item;
    }

    @Getter
    static class Donor{
        private String nickname;
        private Double price;
        private Long order;

        public Donor(String nickname, Double price, Long order) {
            this.nickname = nickname;
            this.price = price;
            this.order = order;
        }
    }
}
