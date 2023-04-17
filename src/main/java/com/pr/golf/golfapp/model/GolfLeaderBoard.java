package com.pr.golf.golfapp.model;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class GolfLeaderBoard extends Table {

	
	public GolfLeaderBoard() {
        super();
        // TODO Auto-generated constructor stub
    }
	
     private long id;

     private long playerId;

     private int avgScorePerRound;	

     private int bestFiveTotalRound;

     private int bonusRounds;

     private int totalPoints;

     private int totalScore;

}
