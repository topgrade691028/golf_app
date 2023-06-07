package com.pr.golf.golfapp.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
@EqualsAndHashCode
@ToString(callSuper = true)
public class AddPlayerDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    @Transient
    private String lastName;

    private int handicap;
    

    
}