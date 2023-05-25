package com.pr.golf.golfapp.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.CompetitionDTO;
import com.pr.golf.golfapp.dto.GolfEventDTO;
import com.pr.golf.golfapp.enums.GolfEventType;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.Player;

@Component
public class GolfEventMapper {
	
	private PlayerMapper playerMapper;
	
	public GolfEventMapper(@Autowired PlayerMapper playerMapper) {
		this.playerMapper = playerMapper;
	}

	public List<GolfEventDTO> toDto(List<GolfEvent> entity) {
		List<GolfEventDTO> golfEventDTOs = entity.stream()
				.map(golfEvent -> GolfEventDTO.builder().id(golfEvent.getId()).name(golfEvent.getName())
						.venue(golfEvent.getVenue())
						.competition(CompetitionDTO.builder()
								.id(golfEvent.getCompetition() != null ? golfEvent.getCompetition().getId() : null)
								.name(golfEvent.getCompetition().getName())
								.build())
						.players(playerMapper.toDto(golfEvent.getPlayers()))
						.build())
				.collect(Collectors.toList());

		return golfEventDTOs;
	}

	public List<GolfEvent> toEntity(List<GolfEventDTO> events) {
		// TODO Auto-generated method stub
		List<GolfEvent> golfEvents = new ArrayList<>();
		if (events != null) {
		    golfEvents = events.stream()
		        .map(golfEventDTO -> {
		            GolfEvent.GolfEventBuilder builder = GolfEvent.builder()
		                .id(golfEventDTO.getId())
		                .name(golfEventDTO.getName())
		                .venue(golfEventDTO.getVenue())
		                .date(golfEventDTO.getDate())
		                .type(golfEventDTO.getType())
		                .players(playerMapper.toEntity(golfEventDTO.getPlayers()))
		                .date(golfEventDTO.getDate());

		            if (golfEventDTO.getCompetition() != null) {
		                builder.competition(Competition.builder()
		                    .id(golfEventDTO.getCompetition().getId())
		                    .build());
		            }

		            return builder.build();
		        })
		        .collect(Collectors.toList());
		}

		return golfEvents;
	}
}
