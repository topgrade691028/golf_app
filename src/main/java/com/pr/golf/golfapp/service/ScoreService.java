package com.pr.golf.golfapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.repository.ScoreRepository;

@Service
public class ScoreService {
	
	private ScoreRepository scoreRepository;
	
    public ScoreService(@Autowired ScoreRepository scoreRepository) {
    	this.scoreRepository = scoreRepository;
    }

	public List<Score> saveAll(List<Score> scores) {
		return scoreRepository.saveAll(scores);
	}

	public Optional<Score> findById(Long id) {
		return scoreRepository.findById(id);
	}

	public Optional<List<Score>> findByEventId(Long eventId) {
		return scoreRepository.findByEventId(eventId);
	}

	public Optional<List<Score>> findByEventIdAndPlayerId(Long eventId, Long playerId) {
		return scoreRepository.findByEventIdAndPlayerId(eventId, playerId);
	}
    
    

}
