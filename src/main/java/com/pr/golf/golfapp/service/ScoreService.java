package com.pr.golf.golfapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.Hole;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.repository.ScoreRepository;
import com.pr.golf.golfapp.request.ScoreRequestBody;

@Service
public class ScoreService {
	
	private ScoreRepository scoreRepository;
	
    public ScoreService(@Autowired ScoreRepository scoreRepository) {
    	this.scoreRepository = scoreRepository;
    }

	public List<Score> saveAll(List<ScoreRequestBody> scoreRequestBodyList) {
		
		List<Score> scores = new ArrayList<Score>(scoreRequestBodyList.size());
		scoreRequestBodyList.stream().forEach( score -> {
			Score tmpScore = Score.builder()
								.event(GolfEvent.builder().id(score.getEventId()).build())
								.player(Player.builder().id(score.getPlayerId()).build())
								.score(score.getScore())
								.points(score.getPoints())
								.hole(Hole.builder().holeNumber(1).build())
								.build();
			scores.add(tmpScore);
		});
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
