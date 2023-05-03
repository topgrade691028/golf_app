package com.pr.golf.golfapp.enums;

public enum CompetitionType {

	STABLEFORD("Stableford"), SCRAMBLE("Scramble"), MATCHPLAY("Match Play"), STROKEPLAY("Stroke PLay");

	private final String type;

	CompetitionType(String competitionType) {
		this.type = competitionType;
	}

	public String getCompetitionType() {
		return type;
	}

}
