package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.model.Player;

@Component
public class PlayerMapper {

    public List<PlayerDTO> toDto(List<Player> entity) {
        List<PlayerDTO> playerDTOs = entity.stream()
            .map(player -> PlayerDTO.builder()
            	.id(player.getId())
                .handicap(player.getHandicap())
                .name(player.getName())
                .build())
            .collect(Collectors.toList());


       /* GolfCourse course = golfCourseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course with ID " + dto.getCourseId() + " not found"));
        entity.setGolfCourse(course);
		*/
        return playerDTOs;
    }
}
