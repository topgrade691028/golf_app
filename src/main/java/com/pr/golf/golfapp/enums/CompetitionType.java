package com.pr.golf.golfapp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum CompetitionType {
    STABLEFORD("Stableford"),
    SCRAMBLE("Scramble"),
    MATCHPLAY("Match Play"),
    STROKEPLAY("Stroke Play");

    private final String type;

    CompetitionType(String competitionType) {
        this.type = competitionType;
    }

    public String getCompetitionType() {
        return type;
    }

    @JsonCreator
    public static CompetitionType fromString(String value) {
        for (CompetitionType type : CompetitionType.values()) {
            if (type.type.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid competition type: " + value);
    }
}
