package com.pr.golf.golfapp.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
@ToString
public class Score {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    @JoinColumn(name= "event_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private GolfEvent event;

    private int score;

    private int points;

    @OneToOne
    @JoinColumn(name = "hole_id", referencedColumnName = "id")
    private Hole hole;

    @ManyToOne
    @JoinColumn(name= "player_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private Player player;
    
    public int getPoints() {
    	/**
    	 * L = Gross Score
    	 * O = Par - Gross Score
    	 * M = Handicap - Stroke Index
    	 * N = IF(M12<0,0,IF(M12<18,1,IF(M12<36,2,3)))
    	 * points = =IF(L12<1,"",IF((2+O12+N12)>-1,(2+O12+N12),0))
    	 * 
    	 */
    	//0
    	int o = hole.getPar() - score;
    	//M
    	int m = player.getHandicap() - hole.getStroke();
    	//=IF(M<0,0,IF(M<18,1,IF(M<36,2,3)))
        int n;
    	if(m < 0) {
    		n = 0;
    	} else if(m < 18) {
    		n = 1;
    	} else if(m < 36 ) {
    		n = 2;
    	} else {
    		n = 3;
    	}
    	
    	//=IF(L<1,"",IF((2+O+N)>-1,(2+O+N),0))
    	if(score < 1) {
    		points = 0;
    	} else if((2 +  0 + n) > -1) {
    		points = 2 + o + n;
    	} else {
    		points = 0;
    	}
    	return points;
    }

}
