package com.pr.golf.golfapp.controller;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.dto.HoleDTO;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfCourse;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.response.ScoreCardResponseBody;
import com.pr.golf.golfapp.service.GolfCourseService;
import com.pr.golf.golfapp.service.PlayerService;
import com.pr.golf.golfapp.service.ScoreService;

@RestController
@RequestMapping("/scorecard")
public class ScoreCardController {

	private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

	private ScoreService scoreService;

	private GolfCourseService golfCourseService;
	
	private PlayerService playerService;

	public ScoreCardController(@Autowired ScoreService scoreService, 
								@Autowired PlayerService playerService,
								@Autowired GolfCourseService golfCourseService) {
		this.scoreService = scoreService;
		this.playerService = playerService;
		this.golfCourseService = golfCourseService;
	}

	@GetMapping("/{id}")
    public ResponseEntity<ScoreCardResponseBody> getScoreCard(@PathVariable Long id) {
		System.out.println("Got here in ScoreCardControler");
    	List<Player> players = List.of(Player.builder().id(1l)
    										.name("Darragh Flynn").handicap(28).build(),
    									Player.builder().id(2l)
    											.name("Paul Ronane").handicap(21).build());
    	
    	Competition competition = Competition.builder().id(1l).name("Sinkers Society").build();
    	
    	/** 
    	List<Hole> holes = List.of(Hole.builder()
    							.white(560)
    							.yellow(549)
    							.id(1l)
    							.holeNumber(1)
    							.name("Everest")
    							.stroke(7)
    							.par(5)
    							.build(), 
    							Hole.builder()
    							.white(325)
    							.yellow(312)
    							.id(2l)
    							.holeNumber(2)
    							.name("Long wash")
    							.stroke(15)
    							.par(4)
    							.build());
    	**/
    	GolfCourse golfCourse = golfCourseService.getGolfCourseByName("Chesunt");
    	List<HoleDTO> holeDtos = golfCourse.getHoles().stream()
    		    .map(hole -> HoleDTO.builder()
    		        .id(hole.getId())
    		        .courseId(golfCourse.getId())
    		        .holeNumber(hole.getHoleNumber())
    		        .par(hole.getPar())
    		        .stroke(hole.getStroke())
    		        .white(hole.getWhite())
    		        .yellow(hole.getYellow())
    		        .red(hole.getRed())
    		        // set other fields as necessary
    		        .build())
    		    .collect(Collectors.toList());

    	    
    	ScoreCardResponseBody scoreCardResponseBody = ScoreCardResponseBody.builder()
    	    .players(players)
    	    .holes(holeDtos)
    	    .competition(competition)
    	    .build();

    	return ResponseEntity.ok(scoreCardResponseBody);
    }
}