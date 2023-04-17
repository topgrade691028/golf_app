package com.pr.golf.golfapp.db;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.jdbc.JdbcTestUtils;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.service.CompetitionService;

@SpringBootTest
public class CompetitionDBTest {

	@Autowired
    CompetitionService competitionService;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

    @Test
    public void bookExistsInTableTest() {
        Competition competition = Competition.builder().name("Sinkers Society").build();
        competitionService.addCompetition(competition);

        List<Competition> competitionList = competitionService.getAllCompetitions();
        Assertions.assertEquals(1, competitionList.size());
    }
    
    @AfterEach
    public void cleanUp() {
    	  JdbcTestUtils.deleteFromTables(jdbcTemplate, "competition");
    }

}
