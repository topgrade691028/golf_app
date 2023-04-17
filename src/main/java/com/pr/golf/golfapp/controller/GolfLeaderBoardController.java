package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
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

import com.pr.golf.golfapp.model.GolfLeaderBoard;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.model.Table;
import com.pr.golf.golfapp.service.GolfLeaderBoardService;

@RestController
@RequestMapping("/golfleaderboard")
public class GolfLeaderBoardController {


    private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

    private GolfLeaderBoardService golfLeaderBoardService;
    
    public GolfLeaderBoardController(@Autowired GolfLeaderBoardService golfLeaderBoardService) {
    	this.golfLeaderBoardService = golfLeaderBoardService;
    }
    
    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GolfLeaderBoard>> createGolfLeaderBoard(@RequestBody List<GolfLeaderBoard> golfLeaderBoardList) throws URISyntaxException {
        System.out.print("Creating GolfLeaderBoard");
        List<GolfLeaderBoard> savedLeaderBoardList = golfLeaderBoardService.createGolfLeaderBoard(golfLeaderBoardList);
        return ResponseEntity.created(new URI("/golfleaderboard/" + 1)).body(savedLeaderBoardList);
    }
    
    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GolfLeaderBoard>> getLeaderBoardByCompetitionId(@RequestParam("competitionId") Long competitionId) throws URISyntaxException {
        System.out.print("Retrieving competitionId " + competitionId);
        Optional<List<GolfLeaderBoard>> optionalGolfLeaderBoard = golfLeaderBoardService.findByCompetitionId(competitionId);
        List<GolfLeaderBoard> golfLeaderBoardList = optionalGolfLeaderBoard.get();
        return ResponseEntity.ok(golfLeaderBoardList);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTable(@PathVariable Long id, @RequestBody List<Score> scores) {
        Table updatedTable = golfLeaderBoardService.update(scores);

        return ResponseEntity.ok(updatedTable);
    }
    @GetMapping("/{id}")
    public Table getEvent(@PathVariable Long id) {
        return golfLeaderBoardService.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(value = "/eventId/{eventId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Table getTablesForEvent(@PathVariable Long eventId) {
        return golfLeaderBoardService.findByEventId(eventId).orElseThrow(RuntimeException::new);
    }
}
