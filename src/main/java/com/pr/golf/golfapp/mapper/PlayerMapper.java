package com.pr.golf.golfapp.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.model.Player;

@Component
public class PlayerMapper {
	
    public PlayerDTO toDto(Player player) {
        PlayerDTO playerDTO = PlayerDTO.builder()
            	.id(player.getId())
                .handicap(player.getHandicap())
                .name(player.getName())
                .build();
        return playerDTO;
    }

    public List<PlayerDTO> toDto(List<Player> entities) {
    	List<PlayerDTO> playerDTOs = new ArrayList<>(entities.size());
    	for(Player entity : entities) {
    		playerDTOs.add(toDto(entity));
    	}
        return playerDTOs;
    }
    
    public List<Player> toEntity(List<PlayerDTO> playerDTO) {
        List<Player> playerEntities = new ArrayList<>();

        if (playerDTO != null) {
            playerEntities = playerDTO.stream()
                .map(player -> Player.builder()
                    .id(player != null ? player.getId() : null)
                    .handicap(player != null ? player.getHandicap() : null)
                    .name(player != null ? player.getName() : null)
                    .build())
                .collect(Collectors.toList());
        }

        return playerEntities;
    }

}
