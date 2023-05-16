package com.pr.golf.golfapp.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@jakarta.persistence.Table(name = "golf_event_player")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@Builder
public class GolfEventPlayer {

    @EmbeddedId
    private GolfEventPlayerId id;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@MapsId("eventId") // Maps the "eventId" attribute of GolfEventPlayerId as part of the composite key
    //private GolfEvent event;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@MapsId("playerId") // Maps the "playerId" attribute of GolfEventPlayerId as part of the composite key
    //private Player player;
}
