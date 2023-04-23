package com.pr.golf.golfapp.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@Getter
@Builder
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@Transactional
public class Competition {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	/**
	 * @FIXME Set below throws a wobbly.
	 */
    @OneToMany(mappedBy="competition", fetch = FetchType.LAZY)
    private List<GolfEvent> events;

}
