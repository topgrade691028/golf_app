package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.GolfEventDTO;
import com.pr.golf.golfapp.model.GolfEvent;

@Component
public class GolfEventMapper {

	  public List<GolfEventDTO> toDto(List<GolfEvent> entity) {
	        List<GolfEventDTO> golfEventDTOs = entity.stream()
	            .map(golfEvent -> GolfEventDTO.builder()
	            	.id(golfEvent.getId())
	                .name(golfEvent.getName())
	                .venue(golfEvent.getVenue())
	                //.players(null)
	                .build())
	            .collect(Collectors.toList());

	        return golfEventDTOs;
	    }
}
