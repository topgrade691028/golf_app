package com.pr.golf.golfapp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScoreCardDTO {
	
	private Long id;
	private String groupNumber;
	private Long eventId;
	private List<PlayerDTO> players;

}
