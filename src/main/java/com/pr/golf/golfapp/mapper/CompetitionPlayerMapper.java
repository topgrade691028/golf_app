package com.pr.golf.golfapp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.CompetitionPlayerDTO;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.CompetitionPlayer;
import com.pr.golf.golfapp.model.Player;

@Component
public class CompetitionPlayerMapper {
	
	private PlayerMapper playerMapper;
	
	private CompetitionMapper competitionMapper;
		
	public CompetitionPlayerMapper(@Autowired PlayerMapper playerMapper,
									@Autowired CompetitionMapper competitionMapper) {
		this.playerMapper = playerMapper;
		this.competitionMapper = competitionMapper;
	}

	public List<CompetitionPlayerDTO> toDto(List<CompetitionPlayer> entity) {

    	List<CompetitionPlayerDTO> competitionPlayerDTOs = entity.stream()
                .map(competitionPlayer -> CompetitionPlayerDTO.builder()
                				.id(competitionPlayer.getId())
                				.competitionId(competitionPlayer.getCompetition().getId())
                				.playerId(competitionPlayer.getPlayer().getId())
                				.build())
                	            .collect(Collectors.toList());

                				


        return competitionPlayerDTOs;
    }

	public CompetitionPlayer toEntity(CompetitionPlayerDTO competitionPlayerDTO) {
    	CompetitionPlayer competition = CompetitionPlayer.builder()
                				.id(competitionPlayerDTO.getId())
                				.competition(Competition.builder().id(competitionPlayerDTO.getCompetitionId()).build())
                				.player(Player.builder().id(competitionPlayerDTO.getPlayerId()).build())
                	            .build();

                				


        return competition;
	}
}
