package com.pr.golf.golfapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoleDTO {
  
    private Long id;
    private int holeNumber;
    private int par;
    private int stroke;
    private int yards;
    private int white;
    private int yellow;
    private int red;
    private Long courseId;

}
