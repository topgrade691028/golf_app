package com.pr.golf.golfapp.model;

import org.hibernate.annotations.Cascade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@jakarta.persistence.Table(name = "player_grouping")
public class PlayerGrouping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "grouping_id")
	private Long groupingId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "event_id")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE)
	private GolfEvent event;

	@Column(name = "group_number")
	private int groupNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "player_id")
	private Player player;

	// ... other relevant fields, constructors, getters, and setters

}
