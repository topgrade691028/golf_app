package com.pr.golf.golfapp.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Getter
public class GolfEvent extends Event {

    private String month;

    private Date date;

    /**
     * K = Player Id
     * V = Player Id List of Scores for an Event
     */
    private Map<Long, List<Score>> playerScoresMap;
    
    private Long competitionId;
}
