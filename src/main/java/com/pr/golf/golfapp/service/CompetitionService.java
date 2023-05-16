package com.pr.golf.golfapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.CompetitionDTO;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.mapper.CompetitionMapper;
import com.pr.golf.golfapp.mapper.PlayerMapper;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.repository.CompetitionPlayerRepository;
import com.pr.golf.golfapp.repository.CompetitionRepository;

@Service
public class CompetitionService {
	
	private CompetitionRepository competitionRepository;
	
	private CompetitionPlayerRepository competitionPlayerRepository;
	
	private CompetitionMapper competitionMapper;
	
	private PlayerMapper playerMapper;
	
	public CompetitionService(@Autowired CompetitionRepository competitionRepository,
								@Autowired CompetitionMapper competitionMapper,
								@Autowired CompetitionPlayerRepository competitionPlayerRepostiory,
								@Autowired PlayerMapper playerMapper) {
		this.competitionRepository = competitionRepository;
		this.competitionMapper = competitionMapper;
		this.competitionPlayerRepository = competitionPlayerRepostiory;
		this.playerMapper = playerMapper;
	}
	
	public Competition addCompetition(CompetitionDTO competitionDTO) {
		Competition competition = competitionMapper.toEntity(competitionDTO);
		return competitionRepository.save(competition);
	}
	
	public List<CompetitionDTO> getAllCompetitions() {
		return competitionMapper.toDto(competitionRepository.findAll());
	}

	
	public List<GolfEvent> getAllEventsForCompetition(long competitionId) {
		return null;
	}

	public Competition getCompetitionById(long competitionId) {
		return competitionRepository.findById(competitionId).get();
	}

	public void deleteCompetition(Long competitionId) {
		// TODO Auto-generated method stub
		 competitionRepository.deleteById(competitionId);
	}

	public List<CompetitionDTO> searchCompetitions(String searchText, String searchType) {
		// TODO Auto-generated method stub
		return competitionMapper.toDto(competitionRepository.searchCompetitions(searchText, searchType));
	}

	public List<PlayerDTO> getPlayersRegisteredForCompetition(Long competitionId) {
		// TODO Auto-generated method stub
		List<Object[]> result = competitionPlayerRepository.getRegisteredPlayersForCompetition(competitionId);
		List<PlayerDTO> players = new ArrayList<>();
		for (Object[] row : result) {
		    Object idObject = row[0];
		    String name = (String) row[1];
		    int handicap = (int) row[2];

		    long id;
		    if (idObject instanceof Integer) {
		        id = ((Integer) idObject).longValue();
		    } else if (idObject instanceof Long) {
		        id = (Long) idObject;
		    } else {
		        throw new IllegalStateException("Unexpected type for id: " + idObject.getClass());
		    }

		    PlayerDTO player = PlayerDTO.builder()
		            .id(id)
		            .name(name)
		            .handicap(handicap)
		            .build();
		    players.add(player);
		}

		return players;
		//return playerMapper.toDto(competitionPlayerRepository.getRegisteredPlayersForCompetition(competitionId));
	}
}
