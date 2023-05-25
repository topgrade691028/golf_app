package com.pr.golf.golfapp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum CompetitionType {
    STABLEFORD("Stableford"),
    SCRAMBLE("Scramble"),
    MATCHPLAY("MatchPlay"),
    STROKEPLAY("StrokePlay");

    private String displayName;

    CompetitionType(String displayName) {
        this.displayName = displayName;
    }

    @JsonCreator
    public static CompetitionType fromString(String value) {
        if (value != null) {
            for (CompetitionType type : CompetitionType.values()) {
                if (type.displayName.equalsIgnoreCase(value)) {
                    return type;
                }
            }
        }
        throw new IllegalArgumentException("Invalid competition type: " + value);
    }
}
