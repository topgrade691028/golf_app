package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.ScoreDTO;
import com.pr.golf.golfapp.model.Score;

@Component
public class ScoreMapper {

    public List<ScoreDTO> toDto(List<Score> entity) {
        List<ScoreDTO> scoreDTOs = entity.stream()
            .map(score -> ScoreDTO.builder()
            	.id(score.getId())
                .eventId(score.getEvent().getId())
                .handicap(score.getPlayer().getHandicap())
                .holeId(score.getHole().getId())
                .holeNumber(score.getHole().getHoleNumber())
                .points(score.getPoints())
                .par(score.getHole().getPar())
                .playerId(score.getPlayer().getId())
                .score(score.getScore())
                .build())
            .collect(Collectors.toList());


       /* GolfCourse course = golfCourseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course with ID " + dto.getCourseId() + " not found"));
        entity.setGolfCourse(course);
		*/
        return scoreDTOs;
    }
}
