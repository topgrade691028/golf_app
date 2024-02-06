package com.pr.golf.golfapp.dto;

import com.pr.golf.golfapp.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
public class UserRoleDTO {

  private Long id;

  private User user;

  private String role;

  // ...

  // Getters and setters
}