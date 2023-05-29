package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.PlayerGroupingDTO;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.PlayerGrouping;

@Component
public class PlayerGroupingMapper {
	
	private PlayerMapper playerMapper;
	
	public PlayerGroupingMapper(@Autowired PlayerMapper playerMapper) {
		this.playerMapper = playerMapper;
	}

	   public List<PlayerGroupingDTO> toDto(List<PlayerGrouping> entity) {
	        List<PlayerGroupingDTO> playerGroupingDTOs = entity.stream()
	            .map(playerGrouping -> PlayerGroupingDTO.builder()	
	            		.id(playerGrouping.getGroupingId())
	            		.groupNumber(playerGrouping.getGroupNumber())
		                .eventId(playerGrouping.getEvent().getId())
		                .player(playerMapper.toDto(List.of(playerGrouping.getPlayer())).get(0))
	                .build())
	            .collect(Collectors.toList());

	        return playerGroupingDTOs;
	    }
	    
	    public List<PlayerGrouping> toEntity(List<PlayerGroupingDTO> playerGroupingDTOs) {
	        List<PlayerGrouping> playerGroupingEntitys = playerGroupingDTOs.stream()
	            .map(playerGroupingDTO -> PlayerGrouping.builder()
	            	.groupingId(playerGroupingDTO.getId())
	            	.groupNumber(playerGroupingDTO.getGroupNumber())
	                .event(GolfEvent.builder().id(playerGroupingDTO.getEventId()).build())
	                .player(playerMapper.toEntity(List.of(playerGroupingDTO.getPlayer())).get(0))
	                .build())
	            .collect(Collectors.toList());

	        return playerGroupingEntitys;
	    }
}
