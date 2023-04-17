package com.pr.golf.golfapp.controller;

import com.pr.golf.golfapp.model.GolfLeaderBoard;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.model.Table;
import com.pr.golf.golfapp.service.GolfLeaderBoardService;
import com.pr.golf.golfapp.service.TableService;

import jakarta.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import java.util.random.RandomGenerator;

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
        System.out.print("Test");
        if(golfLeaderBoardList.get(0).getCompetitionId() == 0) {
        	long competitionId = System.nanoTime();
        	golfLeaderBoardList.stream().forEach(golfLeaderBoardEntry -> golfLeaderBoardEntry.setCompetitionId(competitionId));
        }
        List<GolfLeaderBoard> savedLeaderBoardList = golfLeaderBoardService.createGolfLeaderBoard(golfLeaderBoardList);
        return ResponseEntity.created(new URI("/golfleaderboard/" + 1)).body(savedLeaderBoardList);
    }
    
    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GolfLeaderBoard>> getLeaderBoardByCompetitionId(@RequestParam("competitionId") Long competitionId) throws URISyntaxException {
        System.out.print("competitionId " + competitionId);
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
