package com.pr.golf.golfapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
@ToString
public class BonusPointRule {

	private int id;
	private long comeptitionId;
	private String name;
	private String description;
	private int holeNumber;
	private int points;

}
