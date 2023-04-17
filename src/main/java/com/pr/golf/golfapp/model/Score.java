package com.pr.golf.golfapp.model;


import lombok.*;

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
public class Score {

    private long id;

    private long competitionId;

    private long playerId;

    private int par;

    private int score;

    private int points;

    private int hole;

    private int stroke;

    private int handicap;

}
