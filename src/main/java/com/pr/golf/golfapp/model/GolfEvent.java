package com.pr.golf.golfapp.model;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Getter
public class GolfEvent extends Event {

    private Date date;

    /**
     * K = Player Id
     * V = Player Id List of Scores for an Event
     */
    @Transient
    private Map<Long, List<Score>> playerScoresMap;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "competition_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private Competition competition;
    
	/**
	 * @FIXME Set below throws a wobbly.
	 */
    @OneToMany(mappedBy="event", fetch = FetchType.LAZY)
    private List<Score> scores;
    
    @ManyToMany
    @JoinTable(name = "golf_event_player",
               joinColumns = @JoinColumn(name = "event_id"),
               inverseJoinColumns = @JoinColumn(name = "player_id"))
    private Set<Player> players;
}
