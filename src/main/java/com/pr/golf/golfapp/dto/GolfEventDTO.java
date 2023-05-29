package com.pr.golf.golfapp.dto;

import java.util.Date;
import java.util.List;

import com.pr.golf.golfapp.enums.GolfEventType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode()
@ToString()
@Getter
public class GolfEventDTO {

	private Long id;
	private String name;
	private String venue;
	private GolfEventType type;
	private CompetitionDTO competition;
	private Date date;
	private List<ScoreDTO> scores;
	private List<PlayerDTO> players;
	private GolfCourseDTO golfCourse;
}
