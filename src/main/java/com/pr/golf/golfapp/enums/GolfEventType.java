package com.pr.golf.golfapp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum GolfEventType {
    SINGLES("Singles"),
    DOUBLES("Doubles"),
    FOURBALL("FourBall"),
    FOURSOMES("FourSomes");

    private final String type;

    GolfEventType(String golfEventType) {
        this.type = golfEventType;
    }

    public String getGolfEventType() {
        return type;
    }

    @JsonCreator
    public static GolfEventType fromString(String value) {
        for (GolfEventType type : GolfEventType.values()) {
            if (type.type.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid Golf event type: " + value);
    }
}
