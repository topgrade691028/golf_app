package com.pr.golf.golfapp.controller;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.Hole;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.response.ScoreCardResponseBody;
import com.pr.golf.golfapp.service.PlayerService;
import com.pr.golf.golfapp.service.ScoreService;

@RestController
@RequestMapping("/scorecard")
public class ScoreCardController {

	private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

	private ScoreService scoreService;

	private PlayerService playerService;

	public ScoreCardController(@Autowired ScoreService scoreService, @Autowired PlayerService playerService) {
		this.scoreService = scoreService;
		this.playerService = playerService;
	}

	@GetMapping("/{id}")
    public ResponseEntity<ScoreCardResponseBody> getScoreCard(@PathVariable Long id) {
		System.out.println("Got here in ScoreCardControler");
    	List<Player> players = List.of(Player.builder().id(1l)
    										.name("Paul Ronane").handicap(21).build(),
    									Player.builder().id(2l)
    											.name("Darragh Flynn").handicap(28).build());
    	
    	Competition competition = Competition.builder().id(1l).name("Sinkers Society").build();
    	
    	List<Hole> holes = List.of(Hole.builder()
    							.distanceFromWhite(456)
    							.distanceFromYellow(435)
    							.id(1l)
    							.holeNumber(1)
    							.name("Everest")
    							.stroke(5)
    							.par(4)
    							.build(), 
    							Hole.builder()
    							.distanceFromWhite(220)
    							.distanceFromYellow(122)
    							.id(2l)
    							.holeNumber(2)
    							.name("Long wash")
    							.stroke(1)
    							.par(3)
    							.build());
    	
    	ScoreCardResponseBody scoreCardReponsoBody = ScoreCardResponseBody.builder()
    													.players(players)
    													.holes(holes)
    													.competition(competition)
    													.build();

        return ResponseEntity.ok(scoreCardReponsoBody);
    }
}
