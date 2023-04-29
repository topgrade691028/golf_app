package com.pr.golf.golfapp.model;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * | ________________________________________________
 * | Course Name | Par | Score | Points | Hole | Stroke | Handicap
 * | Player 1    | 4   |  4    | 3      | 1    | 18     | 18
 * | Player 2    | 4   |  4    | 3      | 1    | 18     | 22
 * | Player 3    | 4   |  4    | 3      | 1    | 18     | 24
 *
 */

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
@ToString
public class GolfCourse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String address;
    
	/**
	 * @FIXME Set below throws a wobbly.
	 */
    @OneToMany(mappedBy = "golfCourse", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Hole> holes;
}
