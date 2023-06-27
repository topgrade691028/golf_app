package com.pr.golf.golfapp.dto;

import java.util.List;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.CompetitionPlayer;
import com.pr.golf.golfapp.model.Player;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@Builder
@NoArgsConstructor
public class CreateUserRolesRequestBody {
    private String email;
    private List<String> roles;

    // Constructor, getters, and setters
    // ...
}
