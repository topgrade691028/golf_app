package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.CompetitionDTO;
import com.pr.golf.golfapp.model.Competition;

@Component
public class CompetitionMapper {
	
	@Autowired
	private GolfEventMapper golfEventMapper;
	
	
	public CompetitionMapper(@Autowired GolfEventMapper golfEventMapper) {
		this.golfEventMapper = golfEventMapper;
	}

    public List<CompetitionDTO> toDto(List<Competition> entity) {

    	List<CompetitionDTO> competitionDTOs = entity.stream()
                .map(competition -> CompetitionDTO.builder()
                				.id(competition.getId())
                				.competitionType(competition.getCompetitionType())
                				.events(golfEventMapper.toDto(competition.getEvents()))
                				.name(competition.getName())
                				 .build())
                	            .collect(Collectors.toList());

                				


        return competitionDTOs;
    }

	public Competition toEntity(CompetitionDTO competitionDTO) {
    	Competition competition = Competition.builder()
                				.id(competitionDTO.getId())
                				.competitionType(competitionDTO.getCompetitionType())
                				.events(golfEventMapper.toEntity(competitionDTO.getEvents()))
                				.name(competitionDTO.getName())
                	            .build();

                				


        return competition;
	}
}
