package com.pr.golf.golfapp.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    
    private long eventId;

    private int par;

    private int score;

    private int points;

    private int hole;

    private int stroke;

    @Transient
    private int handicap;

}
