package com.pr.golf.golfapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class GolfLeaderBoard extends Table {

	
	public GolfLeaderBoard() {
        super();
        // TODO Auto-generated constructor stub
    }
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long playerId;

    private int avgScorePerRound;	

    private int bestFiveTotalRound;

    private int bonusRounds;

    private int totalPoints;

    private int totalScore;

}
