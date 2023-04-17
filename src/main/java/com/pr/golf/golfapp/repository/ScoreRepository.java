package com.pr.golf.golfapp.repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.model.Score;

@Component
public class ScoreRepository {

    ConcurrentHashMap<Long, Score> scoreMap = new ConcurrentHashMap();

    public Optional<Score> findById(Long id) {
        return Optional.of(scoreMap.get(id));
    }

    public List<Score> save(List<Score> scores) {
        scores.forEach(score -> {
            scoreMap.put(score.getId(), score);
        } );

        return scores;
    }

    public void deleteById(Long id) {
        scoreMap.remove(id);
    }

    public Optional<Collection<Score>> findByEventId(Long id) {
        return Optional.of(scoreMap.values());
    }

    public List<Score> update(List<Score> scores) {
       scores.stream().forEach( score -> {
            //scoreMap.merge(score.getId(), score,  (oldScore, newScore) -> {
             //  if(oldScore.get)
             //   return newSet;
            //})
            scoreMap.put(score.getId(), score);
        });
        return scores;
    }

	public Optional<List<Score>> findByEventIdAndPlayerId(Long eventId, Long playerId) {
		// TODO Auto-generated method stub
		return Optional.of(Collections.emptyList());
	}
}
