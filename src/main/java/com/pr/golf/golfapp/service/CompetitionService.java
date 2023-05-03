package com.pr.golf.golfapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.CompetitionDTO;
import com.pr.golf.golfapp.mapper.CompetitionMapper;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.repository.CompetitionRepository;

@Service
public class CompetitionService {
	
	private CompetitionRepository competitionRepository;
	
	private CompetitionMapper competitionMapper;
	    
	public CompetitionService(@Autowired CompetitionRepository competitionRepository,
								@Autowired CompetitionMapper competitionMapper) {
		this.competitionRepository = competitionRepository;
		this.competitionMapper = competitionMapper;
	}
	
	public Competition addCompetition(Competition competition) {
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
}
