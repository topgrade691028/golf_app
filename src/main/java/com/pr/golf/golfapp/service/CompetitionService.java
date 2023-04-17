package com.pr.golf.golfapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.repository.CompetitionRepository;

@Service
public class CompetitionService {
	
	private CompetitionRepository competitionRepository;
	    
	public CompetitionService(@Autowired CompetitionRepository competitionRepository) {
		this.competitionRepository = competitionRepository;
	}
	
	public void addCompetition(Competition competition) {
		competitionRepository.save(competition);
	}
	
	public List<Competition> getAllCompetitions() {
		return competitionRepository.findAll();
	}

}
