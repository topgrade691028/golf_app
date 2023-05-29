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
import com.pr.golf.golfapp.dto.GolfEventDTO;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.enums.CompetitionType;
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
    
    @RequestMapping(value = "/create",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Competition> createCompetition(@RequestBody CompetitionDTO competitionDTO) throws URISyntaxException {
        System.out.print("Creating Competition");
        Competition savedCompetition = competitionService.addCompetition(competitionDTO);
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
    
    @GetMapping("/user/{userId}")
    public List<CompetitionDTO> getCompetitions(@PathVariable("userId") Long userId) {
      return competitionService.getAllCompetitions();
    }

    @GetMapping("/retrieveregisteredplayersforcompetition/{competitionId}")
    public List<PlayerDTO> getAllRegisteredPlayersForCompetition(@PathVariable("competitionId") Long competitionId) {
      return competitionService.getPlayersRegisteredForCompetition(competitionId);
    }
    
    @GetMapping("/competition-type")
    public List<CompetitionType> getCompetitionTypes(){
    	
      return Arrays.asList(CompetitionType.values());
    }
    
    @GetMapping("/search") 
    public ResponseEntity<List<CompetitionDTO>> searchCompetitions(@RequestParam String searchText, @RequestParam String searchType) {
        List<CompetitionDTO> competitions = competitionService.searchCompetitions(searchText, searchType);
        return ResponseEntity.ok(competitions);
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GolfEvent>> getEventsForCompetition(@RequestBody Competition competition) throws URISyntaxException {
        System.out.print("Creating Competition");
        List<GolfEvent> golfEvents = competitionService.getAllEventsForCompetition(competition.getId());
        return ResponseEntity.created(new URI("/competition/" + 1)).body(golfEvents);
    }
    
    
    @RequestMapping(value="/registerplayer",
            method = RequestMethod.POST, // Change the request method to 'POST'
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)	
    public ResponseEntity<CompetitionPlayerDTO> registeredPlayerForCompetition(@RequestBody CompetitionPlayerDTO competitionPlayerDTO) throws URISyntaxException {
        System.out.print("Retrieve Players Registered for Competition " + competitionPlayerDTO);
        competitionService.registerPlayerForCompetition(competitionPlayerDTO);
        return ResponseEntity.ok().body(competitionPlayerDTO);
    }
    
    
    @RequestMapping(value="/delete/{competitionId}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteEvents(@PathVariable("competitionId") Long competitionId) throws URISyntaxException {
        System.out.print("Deleting Competition");
        competitionService.deleteCompetition(competitionId);
        return ResponseEntity.accepted().body(String.format("Sucessfully deleted competition %s, ", competitionId));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity updateEvent(@RequestBody CompetitionDTO competition) {
        Competition currentCompetition = competitionService.getCompetitionById(competition.getId());
        Competition updatedCompetition = Competition.builder()
        						.id(currentCompetition.getId())
        						.name(competition.getName())
        						.competitionType(competition.getCompetitionType())
        						.build();
        competitionService.updateCompetition(updatedCompetition);

        return ResponseEntity.ok(competition);
    }
}
