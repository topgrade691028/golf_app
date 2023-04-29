package com.pr.golf.golfapp.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
public class ScoreRequestBody {

	private int score;
	
	private long playerId;
	
	private long eventId;
	
	private int points;
	
	private long holeId;
	
	private int holeNumber;
}
