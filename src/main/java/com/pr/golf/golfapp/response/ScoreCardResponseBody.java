package com.pr.golf.golfapp.response;

import java.util.List;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.Event;
import com.pr.golf.golfapp.model.Hole;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Score;

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
public class ScoreCardResponseBody {
	
	private Competition competition;
	
	private Event eventId;
	
	private List<Hole> holes;
	
	private List<Player> players;
	
	private List<Score> scores;
}
