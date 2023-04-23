package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

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

import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.model.Table;
import com.pr.golf.golfapp.service.ScoreService;
import com.pr.golf.golfapp.service.TableService;

@RestController
@RequestMapping("/scores")
public class ScoreController {


    private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

    private ScoreService scoreService;
    
    private TableService tableService;
    
    public ScoreController(@Autowired  ScoreService scoreService, @Autowired TableService tableService) {
    	this.scoreService = scoreService;
    	this.tableService = tableService;
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Table> createScore(@RequestBody List<Score> scores) throws URISyntaxException {
        System.out.print("Test");
        scores.forEach(score -> {
            Long scoreId = subIdCounter.incrementAndGet();
            score.setId(scoreId);
        });
        List<Score> savedScore = scoreService.saveAll(scores);
        Table table = tableService.updateTable(savedScore);
        return ResponseEntity.created(new URI("/scores/" + 1)).body(table);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateScore(@PathVariable Long id, @RequestBody List<Score> scores) {
        List<Score> updatedScore = scoreService.saveAll(scores);

        return ResponseEntity.ok(updatedScore);
    }
    @GetMapping("/{id}")
    public Score getEvent(@PathVariable Long id) {
        return scoreService.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(value = "/eventId/{eventId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Score> getScoresForEvent(@PathVariable Long eventId) {
        return scoreService.findByEventId(eventId).orElseThrow(RuntimeException::new);
    }
    
    @RequestMapping(value = "/event",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Score> getScoresByEventIdAndPlayerId(@RequestParam Long eventId, 
    													@RequestParam Long playerId) {
        return scoreService.findByEventIdAndPlayerId(eventId, playerId).orElseThrow(RuntimeException::new);
    }
}
