package com.pr.golf.golfapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.repository.CompetitionRepository;

@Service
public class CompetitionService {
	
	private CompetitionRepository competitionRepository;
	    
	public CompetitionService(@Autowired CompetitionRepository competitionRepository) {
		this.competitionRepository = competitionRepository;
	}
	
	public Competition addCompetition(Competition competition) {
		return competitionRepository.save(competition);
	}
	
	public List<Competition> getAllCompetitions() {
		return competitionRepository.findAll();
	}

	
	public List<GolfEvent> getAllEventsForCompetition(long competitionId) {
		return null;
	}

	public Competition getCompetitionById(long competitionId) {
		return competitionRepository.findById(competitionId).get();
	}
}
