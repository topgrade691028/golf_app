package com.pr.golf.golfapp.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * | ________________________________________________
 * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
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
public class Hole {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int holeNumber;
	
    private int par;

    private String name;

    private int stroke;
    
    private int white;
   
    private int yellow;
    
    private int red;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "course_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private GolfCourse golfCourse;
}
