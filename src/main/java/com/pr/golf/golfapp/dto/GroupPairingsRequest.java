package com.pr.golf.golfapp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class GroupPairingsRequest {
    private Long eventId;
    private List<PlayerGroupDTO> playerGroups;

    // Constructors, getters, and setters
}

