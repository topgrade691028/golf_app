package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.model.Competition;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.service.CompetitionService;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    private CompetitionService competitionService;
    
    public CompetitionController(@Autowired CompetitionService competitionService) {
    	this.competitionService = competitionService;
    }
    
    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) throws URISyntaxException {
        System.out.print("Creating Competition");
        Competition savedCompetition = competitionService.addCompetition(competition);
        return ResponseEntity.created(new URI("/competition/" + 1)).body(savedCompetition);
    }
    
    @RequestMapping(value = "/{competitionId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Competition> getCompetition(@PathVariable long competitionId) throws URISyntaxException {
        System.out.print("Getting Competition");
       Competition competition = competitionService.getCompetitionById(competitionId);
        return ResponseEntity.ok().body(competition);
    }
    
    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GolfEvent>> getEventsForCompetition(@RequestBody Competition competition) throws URISyntaxException {
        System.out.print("Creating Competition");
        List<GolfEvent> golfEvents = competitionService.getAllEventsForCompetition(competition.getId());
        return ResponseEntity.created(new URI("/competition/" + 1)).body(golfEvents);
    }
}
