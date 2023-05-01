package com.pr.golf.golfapp.dto;


import java.util.Set;

import com.pr.golf.golfapp.model.GolfEvent;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * | ________________________________________________
 * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
 * | Player 1    | 4   |  4    | 3      | 1    | 18     | 18
 * | Player 2    | 4   |  4    | 3      | 1    | 18     | 22
 * | Player 3    | 4   |  4    | 3      | 1    | 18     | 24
 *
 */


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
@ToString
public class PlayerDTO {

    private long id;

    private String name;

    @Transient
    private String userName;

    private int handicap;
    
}
