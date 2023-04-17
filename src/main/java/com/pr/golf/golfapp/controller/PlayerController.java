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
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.repository.PlayerRepository;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

    private PlayerRepository playerRepository;
    
    public PlayerController(@Autowired PlayerRepository playerRepository) {
    	this.playerRepository = playerRepository;
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createPlayer(@RequestBody List<Player> players) throws URISyntaxException {
        System.out.print("Test");
        players.forEach(score -> {
            Long playerId = subIdCounter.incrementAndGet();
            score.setId(playerId);
        });
        List<Player> savedPlayer = playerRepository.save(players);
        return ResponseEntity.created(new URI("/players/" + 1l)).body(savedPlayer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Player>> updatePlayers(@PathVariable Long id, @RequestBody List<Player> players) {
        Player currentPlayer = playerRepository.findById(id).orElseThrow(RuntimeException::new);
        List<Player> updatedPlayers = playerRepository.update(players);

        return ResponseEntity.ok(updatedPlayers);
    }
    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return playerRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(value = "/eventId/{eventId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Player> getPlayersForEvent(@PathVariable Long eventId) {
        return playerRepository.findByEventId(eventId).orElseThrow(RuntimeException::new);
    }
}
