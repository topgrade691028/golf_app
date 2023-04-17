package com.pr.golf.golfapp.repository;

import com.pr.golf.golfapp.model.Player;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PlayerRepository {

    ConcurrentHashMap<Long, Player> playersMap = new ConcurrentHashMap();

    public Optional<Player> findById(Long id) {
        return Optional.of(playersMap.get(id));
    }

    public List<Player> save(List<Player> players) {
    	players.forEach(player -> {
    		playersMap.put(player.getId(), player);
        } );
    	return players;
    }

    public void deleteById(Long id) {
    	playersMap.remove(id);
    }

    public Optional<Collection<Player>> findByEventId(Long id) {
        return Optional.of(playersMap.values());
    }

    public List<Player> update(List<Player> players) {
        return players;
    }
}
