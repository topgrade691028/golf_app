package com.pr.golf.golfapp.model;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * | ________________________________________________
 * | Player_Name | Hole | Score | Points | Holes Played | Handicap
 * | Player 2    | 1   |  4    | 3       | 1            | 22
 * | Player 1    | 1   |  5    | 2       | 1            | 18
 * | Player 3    | 1   |  6    | 1       | 1            | 24
 */

@SuperBuilder(toBuilder = true)
@Getter
public class EventLeaderBoard {
	
	private long eventId;
	
	private Player player;

    private int hole;

    private int totalScore;

    private int totalPoints;

    private int holesPlayed;

}
