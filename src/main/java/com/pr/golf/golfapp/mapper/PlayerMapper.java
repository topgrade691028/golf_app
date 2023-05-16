package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.model.Player;

@Component
public class PlayerMapper {

    public List<PlayerDTO> toDto(List<Player> entity) {
        List<PlayerDTO> playerDTOs = entity.stream()
            .map(player -> PlayerDTO.builder()
            	.id(player.getId())
                .handicap(player.getHandicap())
                .name(player.getName())
                .build())
            .collect(Collectors.toList());

        return playerDTOs;
    }
    
    public List<Player> toEntity(List<PlayerDTO> playerDTO) {
        List<Player> playerEntitys = playerDTO.stream()
            .map(player -> Player.builder()
            	.id(player.getId())
                .handicap(player.getHandicap())
                .name(player.getName())
                .build())
            .collect(Collectors.toList());

        return playerEntitys;
    }
}
