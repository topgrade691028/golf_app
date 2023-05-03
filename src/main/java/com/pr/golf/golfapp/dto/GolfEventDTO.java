package com.pr.golf.golfapp.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.pr.golf.golfapp.enums.Type;

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
	private Type type;
	private Date date;
	private List<ScoreDTO> scores;
	private Set<PlayerDTO> players;
}
