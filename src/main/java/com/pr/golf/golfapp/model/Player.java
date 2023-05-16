package com.pr.golf.golfapp.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@jakarta.persistence.Table(name="player")
@Getter
@Builder
@Setter
@EqualsAndHashCode
@ToString(callSuper = true)
public class Player {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Transient
    private String userName;

    private int handicap;
    
    @ManyToMany(mappedBy = "players")
    private Set<GolfEvent> golfEvents;
    
}
