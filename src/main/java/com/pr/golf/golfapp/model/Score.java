package com.pr.golf.golfapp.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.*;

/**
 * | ________________________________________________
 * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
 * | Player 1    | 4   |  4    | 3      | 1    | 18     | 18
 * | Player 2    | 4   |  4    | 3      | 1    | 18     | 22
 * | Player 3    | 4   |  4    | 3      | 1    | 18     | 24
 *
 */

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
public class Score {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long competitionId;

    private long playerId;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "event_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private GolfEvent event;

    private int par;

    private int score;

    private int points;

    private int hole;

    private int stroke;

    @Transient
    private int handicap;

}
