package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
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

import com.pr.golf.golfapp.dto.ScoreDTO;
import com.pr.golf.golfapp.mapper.ScoreMapper;
import com.pr.golf.golfapp.model.EventLeaderBoard;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.request.ScoreRequestBody;
import com.pr.golf.golfapp.service.ScoreService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/scores")
public class ScoreController {


    private ScoreService scoreService;
    
    private ScoreMapper scoreMapper;
    
    public ScoreController(@Autowired  ScoreService scoreService, @Autowired ScoreMapper scoreMapper) {
    	this.scoreService = scoreService;
    	this.scoreMapper = scoreMapper;
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ScoreRequestBody>> createOrUpdateScore(@RequestBody List<ScoreRequestBody> scoreRequestBody) throws URISyntaxException {
        System.out.print("Test");
        scoreRequestBody.stream().forEach(score -> log.info(score.toString()));

        List<Score> savedScore = scoreService.saveAll(scoreRequestBody);
        
        //eventLeaderBoardService.
        EventLeaderBoard eventLeaderBoard = EventLeaderBoard.builder().build();
        
        return ResponseEntity.created(new URI("/scores/" + 1)).body(scoreRequestBody);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateScore(@PathVariable Long id, @RequestBody List<ScoreRequestBody> scores) {
        List<Score> updatedScore = scoreService.saveAll(scores);

        return ResponseEntity.ok(updatedScore);
    }
    @GetMapping("/{id}")
    public Score getEvent(@PathVariable Long id) {
        return scoreService.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(value = "/event/{eventId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventLeaderBoard> getScoresForEvent(@PathVariable Long eventId) {
        return scoreService.findByEventId(eventId).orElseThrow(RuntimeException::new);
    }	
    
    @RequestMapping(value = "/event",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Score> getScoresByEventIdAndPlayerId(@RequestParam Long eventId, 
    													@RequestParam Long playerId) {
        return scoreService.findByEventIdAndPlayerId(eventId, playerId).orElseThrow(RuntimeException::new);
    }
  /*  
    @RequestMapping(value = "/event/playerGroup",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Score> getScoresForPlayerGroup(@RequestParam Long eventId, 
    													@RequestParam List<Long> playerIds) {
        return scoreService.findByEventIdAndPlayerIds(eventId, playerIds).orElseThrow(RuntimeException::new);
    } */
    
    @RequestMapping(value = "/event/playergroup",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ScoreDTO> getScoresForPlayerGroup(@RequestParam Long eventId, 
    													@RequestParam int groupNumber) {
        return scoreMapper.toDto(scoreService.findByEventIdAndGroupNumber(eventId, groupNumber).orElseThrow(RuntimeException::new));
    }
   
}
