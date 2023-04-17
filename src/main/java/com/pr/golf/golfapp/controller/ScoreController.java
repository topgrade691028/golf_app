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
import com.pr.golf.golfapp.repository.ScoreRepository;
import com.pr.golf.golfapp.service.TableService;

@RestController
@RequestMapping("/scores")
public class ScoreController {


    private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

    private ScoreRepository scoreRepository;
    
    private TableService tableService;
    
    public ScoreController(@Autowired  ScoreRepository scoreRepository, @Autowired TableService tableService) {
    	this.scoreRepository = scoreRepository;
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
        List<Score> savedScore = scoreRepository.save(scores);
        Table table = tableService.updateTable(savedScore);
        return ResponseEntity.created(new URI("/scores/" + 1)).body(table);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateScore(@PathVariable Long id, @RequestBody List<Score> scores) {
        List<Score> updatedScore = scoreRepository.update(scores);

        return ResponseEntity.ok(updatedScore);
    }
    @GetMapping("/{id}")
    public Score getEvent(@PathVariable Long id) {
        return scoreRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(value = "/eventId/{eventId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Score> getScoresForEvent(@PathVariable Long eventId) {
        return scoreRepository.findByEventId(eventId).orElseThrow(RuntimeException::new);
    }
    
    @RequestMapping(value = "/event",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Score> getScoresByEventIdAndPlayerId(@RequestParam Long eventId, 
    													@RequestParam Long playerId) {
        return scoreRepository.findByEventIdAndPlayerId(eventId, playerId).orElseThrow(RuntimeException::new);
    }
}
