package com.pr.golf.golfapp.integration;

import java.util.List;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ContextConfiguration;

import com.pr.golf.golfapp.GolfAppApplication;
import com.pr.golf.golfapp.controller.PlayerController;
import com.pr.golf.golfapp.controller.ScoreController;
import com.pr.golf.golfapp.helper.PlayerHelper;
import com.pr.golf.golfapp.helper.ScoreHelper;
import com.pr.golf.golfapp.model.EventLeaderBoard;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Score;

import reactor.core.publisher.Flux;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = GolfAppApplication.class)
public class PlayerScoreIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private PlayerController playerController;

    @Autowired
    private ScoreController scoreController;
    

    /**
     *  Competition Type: Stableford
     *  Competition Format: League
     *  Competition : Golf
     *
     * 1. Player 1 submit scores for Player 1, Player 2, Player 3 for 1st hole.
     * 2. Request made to /players to add scores for Player 1, Player 2, Player 3.
     * 3. Table Update with Latest Scores and sorted with TotalPoints by Player.
     * 4. Player 1 submit scores for Player 1, Player 2, Player 3 for 2nd hole.
     * 5. Request made to /players to add scores for Player 1, Player 2, Player 3.
     * 6. Table update with Latest Scores and sorted with TablePoints by Player.
     * 7. Player 1 submit scores for Player 1, Player 2, Player 3 for 3rd hole.
     * 8. Request made to /players to add scores for Player 1, Player 2, Player 3.
     * 9. Table update with Latest Scores and sorted with TablePoints by Player.
     *
     * Score Card Before 1st Hole
     * | ________________________________________________
     * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
     * | Player 1    | 0   |  0    | 0      | 0    | 18     | 18
     * | Player 2    | 0   |  0    | 0      | 0    | 18     | 22
     * | Player 3    | 0   |  0    | 0      | 0    | 18     | 24
     *
     * Player 1 submits scores for Player 1 (2) , Player 2 (3), Player 3(1) after 1st Hole
     * ScoreCard After first hole
     * | ________________________________________________
     * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
     * | Player 1    | 4   |  5    | 2      | 1    | 18     | 18
     * | Player 2    | 4   |  4    | 3      | 1    | 18     | 22
     * | Player 3    | 4   |  6    | 1      | 1    | 18     | 24
     *
     * Table After 1st hole
     * | ________________________________________________
     * | Player_Name | Hole | Score | Points | Holes Played | Handicap
     * | Player 2    | 1   |  4    | 3       | 1            | 22
     * | Player 1    | 1   |  5    | 2       | 1            | 18
     * | Player 3    | 1   |  6    | 1       | 1            | 24
     *
     * Player 1 submits scores for Player 1(1), Player 2(2), Player 3(1) for 2nd hole
     * | ________________________________________________
     * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
     * | Player 1    | 5   |  6    | 2      | 2    | 4      | 18
     * | Player 2    | 5   |  6    | 2      | 2    | 4      | 22
     * | Player 3    | 5   |  7    | 1      | 2    | 4      | 24
     *
     * Table After 2nd hole
     * | ________________________________________________
     * | Player_Name | Hole | Score | Points | Holes Played | Handicap
     * | Player 2    | 2   |  10    | 5       | 2           | 22
     * | Player 1    | 2   |  11    | 4       | 2           | 18
     * | Player 3    | 2   |  13    | 2       | 2           | 24
     *
     * Player 1 submits scores for Player 1(3), Player 2(1), Player 3(0) for 3rd hole
     * | ________________________________________________
     * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
     * | Player 2    | 3   |  5    | 1      | 3    | 18     | 22
     * | Player 1    | 3   |  3    | 3      | 3    | 18     | 18
     * | Player 3    | 3   |  6    | 0      | 3    | 18     | 24
     *
     * Table After 3rd hole
     * | ________________________________________________
     * | Player_Name | Hole | Score | Points | Holes Played | Stroke | Handicap
     * | Player 1    | 3   |  14    | 7       | 3           | 18
     * | Player 2    | 3   |  15    | 6       | 3           | 22
     * | Player 3    | 3   |  19    | 2       | 3           | 24
     *
     * |
     * |
     * @throws InterruptedException 
     */
	@Test
	public void testPlayerCreation() throws InterruptedException {

		Player player1 = Player.builder().id(1l).name("Player 1").build();
		Player player2 = Player.builder().id(2l).name("Player 2").build();
		Player player3 = Player.builder().id(3l).name("Player 3").build();

		List<Player> playersReturn = (List<Player>) PlayerHelper.addPlayers(Lists.newArrayList(player1, player2, player3),
				playerController, port);

	    /* Player 1 submits scores for Player 1 (2) , Player 2 (3), Player 3(1) after 1st Hole
	     * ScoreCard After first hole
	     * | ________________________________________________
	     * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
	     * | Player 1    | 4   |  5    | 2      | 1    | 18     | 18
	     * | Player 2    | 4   |  4    | 3      | 1    | 18     | 22
	     * | Player 3    | 4   |  6    | 1      | 1    | 18     | 24
	     */ 
		Score player1Score1 = Score.builder().id(1l).playerId(1l).handicap(18).par(4).score(5).points(2).hole(1)
				.stroke(18).build();

		Score player2Score1 = Score.builder().id(2l).playerId(2l).handicap(22).par(4).score(4).points(3).hole(1)
				.stroke(18).build();

		Score player3Score1 = Score.builder().id(3l).playerId(3l).handicap(24).par(4).score(6).points(1).hole(1)
				.stroke(18).build();

		Flux<EventLeaderBoard> leaderBoardAfterHole1 = ScoreHelper
				.addScore(Lists.newArrayList(player1Score1, player2Score1, player3Score1), scoreController, port);

		System.out.println("Got here");
		System.out.println(leaderBoardAfterHole1.blockFirst().getCompetitionId());

		Assertions.assertTrue(leaderBoardAfterHole1.blockFirst().getCompetitionId() == 1l);

	    /* Player 1 submits scores for Player 1(1), Player 2(2), Player 3(1) for 2nd hole
	     * | ________________________________________________
	     * | Player_Name | Par | Score | Points | Hole | Stroke | Handicap
	     * | Player 1    | 5   |  6    | 2      | 2    | 4      | 18
	     * | Player 2    | 5   |  6    | 2      | 2    | 4      | 22
	     * | Player 3    | 5   |  7    | 1      | 2    | 4      | 24
	     */ 
		Score player1Score2 = Score.builder().id(4l).playerId(1l).handicap(18).par(4).score(6).points(2).hole(2)
				.stroke(4).build();

		Score player2Score2 = Score.builder().id(5l).playerId(2l).handicap(22).par(4).score(4).points(3).hole(1)
				.stroke(4).build();

		Score player3Score2 = Score.builder().id(6l).playerId(3l).handicap(24).par(4).score(6).points(1).hole(1)
				.stroke(18).build();
		
		Flux<EventLeaderBoard> leaderBoardAfterHole2 = ScoreHelper
				.addScore(Lists.newArrayList(player1Score2, player2Score2, player3Score2), scoreController, port);
		Thread.sleep(10000);
	}
}
