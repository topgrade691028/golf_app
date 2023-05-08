package com.pr.golf.golfapp.controller;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.dto.BonusPointRule;
import com.pr.golf.golfapp.dto.HoleDTO;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.dto.ScoreDTO;
import com.pr.golf.golfapp.enums.CompetitionType;
import com.pr.golf.golfapp.mapper.PlayerMapper;
import com.pr.golf.golfapp.mapper.ScoreMapper;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfCourse;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.response.ScoreCardResponseBody;
import com.pr.golf.golfapp.service.GolfCourseService;
import com.pr.golf.golfapp.service.GolfEventService;
import com.pr.golf.golfapp.service.PlayerService;
import com.pr.golf.golfapp.service.ScoreService;

@RestController
@RequestMapping("/scorecard")
public class ScoreCardController {

	private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

	private ScoreService scoreService;

	private GolfEventService golfEventService;

	private GolfCourseService golfCourseService;

	private ScoreMapper scoreMapper;

	private PlayerMapper playerMapper;

	private PlayerService playerService;

	public ScoreCardController(@Autowired ScoreService scoreService, @Autowired PlayerService playerService,
			@Autowired GolfCourseService golfCourseService, @Autowired ScoreMapper scoreMapper,
			@Autowired GolfEventService golfEventService, @Autowired PlayerMapper playerMapper) {
		this.scoreService = scoreService;
		this.playerService = playerService;
		this.golfCourseService = golfCourseService;
		this.scoreMapper = scoreMapper;
		this.golfEventService = golfEventService;
		this.playerMapper = playerMapper;
	}

	@GetMapping("/{id}")
	public ResponseEntity<ScoreCardResponseBody> getScoreCard(@PathVariable Long id) {
		System.out.println("Got here in ScoreCardControler");
		/*
		 * List<Player> players = List.of(Player.builder().id(1l)
		 * .name("Darragh Flynn").handicap(28).build(), Player.builder().id(2l)
		 * .name("Paul Ronane").handicap(21).build());
		 */

		Optional<List<Player>> players = playerService.findPlayersByEventId(id);

		Competition competition = Competition.builder().id(1l).competitionType(CompetitionType.STABLEFORD)
				.name("Sinkers Society").build();

		/**
		 * List<Hole> holes = List.of(Hole.builder() .white(560) .yellow(549) .id(1l)
		 * .holeNumber(1) .name("Everest") .stroke(7) .par(5) .build(), Hole.builder()
		 * .white(325) .yellow(312) .id(2l) .holeNumber(2) .name("Long wash")
		 * .stroke(15) .par(4) .build());
		 **/
		GolfCourse golfCourse = golfCourseService.getGolfCourseByName("Essendon");
		List<HoleDTO> holeDtos = golfCourse.getHoles().stream()
				.map(hole -> HoleDTO.builder().id(hole.getId()).courseId(golfCourse.getId())
						.holeNumber(hole.getHoleNumber()).par(hole.getPar()).stroke(hole.getStroke())
						.white(hole.getWhite()).yellow(hole.getYellow()).red(hole.getRed())
						// set other fields as necessary
						.build())
				.collect(Collectors.toList());

		Optional<GolfEvent> golfEvent = golfEventService.getGolfEventById(id);

		Optional<List<Score>> scores = scoreService.findScoresByEventId(id);

		List<ScoreDTO> scoreDtos = scoreMapper.toDto(scores.get());

		List<PlayerDTO> playerDtos = playerMapper.toDto(players.get());

		ScoreCardResponseBody scoreCardResponseBody = ScoreCardResponseBody.builder()
				.holes(holeDtos)
				.players(playerDtos)
				.golfEvent(GolfEvent.builder().id(golfEvent.get().getId()).name(golfEvent.get().getName()).build())
				.scoreDTOs(scoreDtos).competition(competition)
				.bonusPointRules(List.of(
						BonusPointRule.builder().comeptitionId(competition.getId()).name("Closest to the pin").points(5)
								.holeNumber(7).build(),
						BonusPointRule.builder().comeptitionId(competition.getId()).name("Longest Drive").points(5)
								.holeNumber(17).build()))
				.build();

		scoreCardResponseBody.getScoreDTOs().stream().forEach(score -> {
			System.out.print(" " + score.getPoints());
		});
		System.out.print(scoreCardResponseBody.toString());
		return ResponseEntity.ok(scoreCardResponseBody);
	}
}
