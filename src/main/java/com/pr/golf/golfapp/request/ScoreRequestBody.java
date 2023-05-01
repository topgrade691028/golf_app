package com.pr.golf.golfapp.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
@ToString
public class ScoreRequestBody {

	private long id;
	
	private int score;
	
	private long playerId;
	
	private long eventId;
	
	private int points;
	
	private long holeId;
	
	private int holeNumber;
}
