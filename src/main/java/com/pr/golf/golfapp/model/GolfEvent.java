package com.pr.golf.golfapp.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name="golf_event")
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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "competition_id", updatable = false)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private Competition competition;
    
	/**
	 * @FIXME Set below throws a wobbly.
	 */
    @OneToMany(mappedBy="event", fetch = FetchType.LAZY)
    private List<Score> scores;
    
    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "golf_event_player",
               joinColumns = @JoinColumn(name = "event_id"),
               inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Player> players;
    
    @PrePersist
    @PreUpdate
    private void validate() {
        if (this.getName() == null || this.getName().isEmpty()) {
            throw new IllegalArgumentException("GolfEvent name cannot be null or empty");
        }
        System.out.print("Getname is " + getName());
    }
}
