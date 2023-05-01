package com.pr.golf.golfapp.response;

import java.util.List;

import com.pr.golf.golfapp.dto.HoleDTO;
import com.pr.golf.golfapp.dto.ScoreDTO;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.Player;

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
	
	private GolfEvent golfEvent;
	
	private List<HoleDTO> holes;
	
	private List<Player> players;
	
	private List<ScoreDTO> scoreDTOs;
}
