package com.pr.golf.golfapp.service;

import java.net.URISyntaxException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.pr.golf.golfapp.GolfAppApplication;
import com.pr.golf.golfapp.dto.ScoreDTO;
import com.pr.golf.golfapp.utility.JsonFileReader;


@SpringBootTest
@ContextConfiguration(classes = GolfAppApplication.class)
public class ScoreServiceTest {
	
	@Autowired
	private ScoreService scoreService;
	
   
	@Test
	public void testScoreCreation() throws InterruptedException, URISyntaxException {

		List<ScoreDTO> scores = (List<ScoreDTO>) JsonFileReader.getListFromFile(ScoreDTO.class, "src\\test\\resources\\scores\\chesunt_scores.json");
		System.out.println(scores.toString());
		System.out.println("Points for Player 1 for Hole 1 is " + scores.get(0).getPoints());
		System.out.println("Points for Player 2 for Hole 1 is " + scores.get(1).getPoints());
		System.out.println("Points for Player 1 for Hole 2 is " + scores.get(2).getPoints());
		System.out.println("Points for Player 2 for Hole 2 is " + scores.get(3).getPoints());
		
		
	}
}
