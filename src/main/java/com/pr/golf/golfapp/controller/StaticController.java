package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.dto.CompetitionDTO;
import com.pr.golf.golfapp.dto.CompetitionPlayerDTO;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.enums.CompetitionType;
import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.service.CompetitionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/public")
public class StaticController {

    private CompetitionService competitionService;
    
    public StaticController(@Autowired CompetitionService competitionService) {
    	this.competitionService = competitionService;
    }
  
    @GetMapping("/competition-type")
    public List<CompetitionType> getCompetitionTypes(){
    	log.info("Retrieve competition types");
      return Arrays.asList(CompetitionType.values());
    }

}
