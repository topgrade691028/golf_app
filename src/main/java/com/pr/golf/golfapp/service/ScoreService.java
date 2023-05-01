package com.pr.golf.golfapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.model.EventLeaderBoard;
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
					            .id(score.getId())
								.event(GolfEvent.builder().id(score.getEventId()).build())
								.player(Player.builder().id(score.getPlayerId()).build())
								.score(score.getScore())
								.points(score.getPoints())
								.hole(Hole.builder()
											.holeNumber(score.getHoleNumber())
											.id(score.getHoleId())
											.build())
								.build();
			scores.add(tmpScore);
		});
		scores.stream().forEach(System.out::println);
		return scoreRepository.saveAll(scores);
	}


	public Optional<Score> findById(Long id) {
		return scoreRepository.findById(id);
	}

	public Optional<List<Score>> findScoresByEventId(Long eventId) {
		Optional<List<Score>> scores = scoreRepository.findByEventId(eventId);

		return scores;
	}
	
	public Optional<List<EventLeaderBoard>> findByEventId(Long eventId) {
		Optional<List<Score>> scores = scoreRepository.findByEventId(eventId);

		return Optional.ofNullable(convertScoresToLeaderboard(scores.get()));
	}

	public Optional<List<Score>> findByEventIdAndPlayerId(Long eventId, Long playerId) {
		return scoreRepository.findByEventIdAndPlayerId(eventId, playerId);
	}
    
	public List<EventLeaderBoard> convertScoresToLeaderboard(List<Score> scores) {
	    // Group the scores by player and collect the stats for each player
	    Map<Player, int[]> playerStats = scores.stream()
	        .collect(Collectors.groupingBy(Score::getPlayer, 
	            Collectors.reducing(new int[2], 
	                score -> new int[]{score.getScore(), score.getPoints()}, 
	                (stats1, stats2) -> new int[]{stats1[0] + stats2[0], stats1[1] + stats2[1]}
	            )
	        ));
	    
	    // Create an EventLeaderBoard object for each player
	    List<EventLeaderBoard> leaderboard = playerStats.entrySet().stream()
	        .map(entry -> {
	            Player player = entry.getKey();
	            int[] stats = entry.getValue();
	            
	            EventLeaderBoard leaderboardEntry = EventLeaderBoard.builder()
	                    .eventId(scores.get(0).getEvent().getId()) // assume all scores have the same event
	                    .player(PlayerDTO.builder()
	                    		.name(player.getName())
	                    		.id(player.getId())
	                    		.handicap(player.getHandicap())
	                    		.build())
	                    .totalScore(stats[0])
	                    .totalPoints(stats[1])
	                    .holesPlayed(scores.stream()
	                    	    .filter(s -> s.getPlayer().equals(player))
	                    	    .mapToInt(s -> (int) s.getId())
	                    	    .max()
	                    	    .orElse(0))
	                    .build();
	            
	            return leaderboardEntry;
	        })
	        .collect(Collectors.toList());
	    
	    return leaderboard;
	}

    

}
