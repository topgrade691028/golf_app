package com.pr.golf.golfapp.helper;

import java.util.List;

import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.pr.golf.golfapp.controller.ScoreController;
import com.pr.golf.golfapp.model.EventLeaderBoard;
import com.pr.golf.golfapp.model.Score;

import reactor.core.publisher.Flux;

public class ScoreHelper {
	

	public static Flux<EventLeaderBoard> addScore(List<Score> scores, ScoreController scoreController, int port) {
	     UriComponents uri = UriComponentsBuilder.newInstance()
                 .port(port)
                 .host("127.0.0.1").port(port).build();
		
		 Flux<EventLeaderBoard> leaderBoardReturned =  WebTestClient
	                .bindToController(scoreController)
	                .build()
	                .post()
	                .uri(uri.toString()+"/scores")
	                .bodyValue(scores)
	                .exchange()
	                .expectStatus().isCreated()
	                .expectHeader().valueEquals("Content-Type", "application/json")
	                .expectAll(jsonBodySpec -> {
	                    jsonBodySpec.expectBody().jsonPath("competitionId").isEqualTo(1l);
	                }, responseSpec -> {
	                    responseSpec.expectBody(EventLeaderBoard.class).value(leaderBoard -> {
	                        leaderBoard.getCompetitionId();
	                    });
	                }).returnResult(EventLeaderBoard.class).getResponseBody();
		 
		 return leaderBoardReturned;
		
	}

}
