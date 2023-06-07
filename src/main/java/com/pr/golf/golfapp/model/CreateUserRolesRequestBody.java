package com.pr.golf.golfapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@ToString
@Getter
public class CreateUserRolesRequestBody {
    private String email;
    private List<String> roles;

    // Constructor, getters, and setters
    // ...
}
