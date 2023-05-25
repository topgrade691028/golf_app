package com.pr.golf.golfapp.dto;

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
public class CompetitionPlayerDTO {
	
	private Long id;
	private Long playerId;
	private Long competitionId;

}
