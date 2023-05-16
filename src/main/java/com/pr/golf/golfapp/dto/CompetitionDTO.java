package com.pr.golf.golfapp.dto;

import java.util.List;

import com.pr.golf.golfapp.enums.CompetitionType;

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
public class CompetitionDTO {
	
	private Long id;
	private String name;
	private CompetitionType competitionType;
    private List<GolfEventDTO> events;

}
