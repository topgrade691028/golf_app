package com.pr.golf.golfapp.helper;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.pr.golf.golfapp.controller.GolfLeaderBoardController;
import com.pr.golf.golfapp.model.GolfLeaderBoard;

public class GolfLeaderBoardHelper {


	public static List<GolfLeaderBoard> getGolfEventLeaderBoard(long competitionId, GolfLeaderBoardController golfLeaderBoardController, int port) {
	     UriComponents uri = UriComponentsBuilder.newInstance()
                 .host("127.0.0.1")
                 .port(port)
                 .path("golfleaderboard")
                 .queryParam("competitionId", competitionId)
                 .build();

		 List<GolfLeaderBoard> leaderBoardReturned =  WebTestClient
	                .bindToController(golfLeaderBoardController)
	                .build().mutate().responseTimeout(Duration.of(36000l, ChronoUnit.MILLIS)).build()
	                .get()
	                .uri(uri.toString())
	                .exchange()
	                .expectStatus().isOk()
	                .expectHeader().valueEquals("Content-Type", "application/json")
	                .expectAll(jsonBodySpec -> {
	                	/** jsonBodySpec.expectBody().jsonPath("competitionId").isEqualTo(1l);
	                    log.info(jsonBodySpec.expectBody().returnResult());
						 @FIXME
						 * }, responseSpec -> {
						 * responseSpec.expectBody(GolfLeaderBoard.class).value(leaderBoard -> {
						 * leaderBoard.getCompetitionId(); });
						 * 
						 */
	                }, responseSpec -> {
	                    responseSpec.expectBodyList(GolfLeaderBoard.class)
	                    .consumeWith(result -> {
	                    	List<GolfLeaderBoard> golfLeaderBoard = result.getResponseBody();
	                        log.info(golfLeaderBoard);
	                      });
	                    
	                }).expectBodyList(GolfLeaderBoard.class).returnResult().getResponseBody();
		 
		 return leaderBoardReturned;
		
	}

}
