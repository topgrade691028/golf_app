package com.pr.golf.golfapp.integration;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import org.assertj.core.util.Lists;
import org.assertj.core.util.Maps;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;

import com.pr.golf.golfapp.GolfAppApplication;
import com.pr.golf.golfapp.controller.CompetitionController;
import com.pr.golf.golfapp.controller.EventsController;
import com.pr.golf.golfapp.controller.GolfLeaderBoardController;
import com.pr.golf.golfapp.controller.PlayerController;
import com.pr.golf.golfapp.controller.ScoreController;
import com.pr.golf.golfapp.helper.GolfEventHelper;
import com.pr.golf.golfapp.helper.GolfLeaderBoardHelper;
import com.pr.golf.golfapp.helper.PlayerHelper;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.Event;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.GolfLeaderBoard;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.utility.JsonFileReader;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = GolfAppApplication.class)
@AutoConfigureWebTestClient(timeout = "36000")
public class GolfLeaderBoardIntegrationTest {

    @LocalServerPort
    private int port;

	@Autowired
	private GolfLeaderBoardController golfLeaderBoardController;

    @Autowired
    private PlayerController playerController;

	@Autowired
	private EventsController eventsController;
	
	@Autowired
	private ScoreController scoreController;

	@Autowired
	private CompetitionController competitionController;
	
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
     * @throws URISyntaxException 
     */
	@Test
	public void testPlayerCreation() throws InterruptedException, URISyntaxException {

		Competition competition = competitionController.createCompetition(Competition.builder().name("Sinkers Society").build()).getBody();
		
		Player player1 = Player.builder().id(1l).name("Player 1").build();
		Player player2 = Player.builder().id(2l).name("Player 2").build();
		Player player3 = Player.builder().id(3l).name("Player 3").build();
		List<Player> players = Lists.newArrayList(player1, player2, player3);
		PlayerHelper.addPlayers(players, playerController, port);
		
		GolfLeaderBoard golfLeaderBoardPlayer1 = GolfLeaderBoard.builder()
				.competitionId(competition.getId())
				.playerId(player1.getId())
				.build();
		
		GolfLeaderBoard golfLeaderBoardPlayer2 = GolfLeaderBoard.builder()
				.competitionId(competition.getId())
				.playerId(player2.getId())
				.build();
		
		GolfLeaderBoard golfLeaderBoardPlayer3 = GolfLeaderBoard.builder()
				.competitionId(competition.getId())
				.playerId(player3.getId())
				.build();
		
		ResponseEntity<List<GolfLeaderBoard>> returnedGolfLeaderBoard = golfLeaderBoardController.
													createGolfLeaderBoard(Lists.newArrayList(golfLeaderBoardPlayer1, golfLeaderBoardPlayer2, golfLeaderBoardPlayer3));
		
		List<Score> scores = (List<Score>) JsonFileReader.getListFromFile(Score.class, "src\\test\\resources\\scores\\player1_silvermere_scores.json");
		
		List<Score> silverMereScoresForPlayer1 = scores;
		
		List<Score> silverMereScoresForPlayer2 = Lists.newArrayList(Score.builder()
				.build());
		

		List<Score> silverMereScoresForPlayer3 = Lists.newArrayList(Score.builder()
				.build());
		
		
		Map<Long, List<Score>> playerScoresMapSilverMere = Maps.newHashMap(1l, silverMereScoresForPlayer1);
		playerScoresMapSilverMere.put(2l, silverMereScoresForPlayer2);
		playerScoresMapSilverMere.put(3l, silverMereScoresForPlayer3);
		
		GolfEvent silvermereEvent = GolfEvent.builder()
				.playerScoresMap(playerScoresMapSilverMere)
				.month("March")
				.competitionId(competition.getId())
				.id(1l)
				.venue("silvermere")
				//.dat
				.build();

		List<Score> lutonHooScoresForPlayer1 = Lists.newArrayList(Score.builder()
						.build());
		
		List<Score> lutonHooScoresForPlayer2 = Lists.newArrayList(Score.builder()
															.build());
		
		List<Score> lutonHooScoresForPlayer3 = Lists.newArrayList(Score.builder()
																	.build());
	
		Map<Long, List<Score>> playerScoresMapLutoHoo = Maps.newHashMap(1l, lutonHooScoresForPlayer1);
		playerScoresMapLutoHoo.put(2l, lutonHooScoresForPlayer2);
		playerScoresMapLutoHoo.put(3l, lutonHooScoresForPlayer3);				
				
		GolfEvent lutonHooEvent = GolfEvent.builder()
				.playerScoresMap(playerScoresMapLutoHoo)
				.month("April")
				.id(2l)
				.competitionId(competition.getId())
				.venue("luton hoo")
				//.dat
				.build();
		List<Event>  events = Lists.newArrayList(silvermereEvent, lutonHooEvent);
		GolfEventHelper.addEvents(events, eventsController, port);

		List<Score> scoresForPlayer1ForSilverMere = scoreController.getScoresByEventIdAndPlayerId(1l, 1l);
				
		
		List<GolfLeaderBoard> leaderBoardAfterFirstEvent = GolfLeaderBoardHelper
				.getGolfEventLeaderBoard(competition.getId(), golfLeaderBoardController, port);

		//Assertions.assertEquals(1l, leaderBoardAfterFirstEvent.get(0).getCompetitionId());


		List<GolfLeaderBoard> leaderBoardAfterSecondEvent = GolfLeaderBoardHelper
				.getGolfEventLeaderBoard(competition.getId(), golfLeaderBoardController, port);

		


		Thread.sleep(10000);

	}
}
