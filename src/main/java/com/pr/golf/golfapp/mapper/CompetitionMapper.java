package com.pr.golf.golfapp.mapper;

import java.util.ArrayList;
import java.util.List;

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

    public CompetitionDTO toDto(Competition entity) {

    	CompetitionDTO competitionDTO =  CompetitionDTO.builder()
                				.id(entity.getId())
                				.competitionType(entity.getCompetitionType())
                				.events(golfEventMapper.toDto(entity.getEvents()))
                				.name(entity.getName())
                				.build();

        return competitionDTO;
    }
	
    public List<CompetitionDTO> toDto(List<Competition> entities) {
    	List<CompetitionDTO> competitionDTOs = new ArrayList<CompetitionDTO>(entities.size());
    	for(Competition competition : entities) {
    		competitionDTOs.add(toDto(competition));
    	}
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
