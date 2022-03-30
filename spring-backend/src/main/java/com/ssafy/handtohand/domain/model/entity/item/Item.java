package com.ssafy.handtohand.domain.model.entity.item;

import javax.persistence.*;
import static javax.persistence.GenerationType.*;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name="item_seq")
    private Long seq;

}
