package com.pr.golf.golfapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoleDTO {
  
	private Long courseId;
    private int holeNumber;
    private int white;
    private int yellow;
    private int red;
    private int par;
    private int stroke;
    
}
