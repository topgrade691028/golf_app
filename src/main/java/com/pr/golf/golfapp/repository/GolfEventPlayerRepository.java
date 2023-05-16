package com.pr.golf.golfapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.GolfEventPlayer;
import com.pr.golf.golfapp.model.Player;

@Repository
public interface GolfEventPlayerRepository extends JpaRepository<GolfEventPlayer, Long> {

	 @Query(value = "SELECT p.id, p.name, p.handicap " +
             "FROM golf_event_player gep " +
             "JOIN player p ON gep.player_id = p.id " +
             "WHERE gep.event_id = :eventId", nativeQuery = true)
	 List<Player> findPlayersRegisteredForEventByEventId(@Param("eventId") Long eventId);

	
	@Modifying
    @Query(value = "DELETE FROM golf_event_player WHERE event_id = :eventId AND player_id = :playerId", nativeQuery = true)
    void deleteByEventIdAndPlayerId(@Param("eventId") Long eventId, @Param("playerId") Long playerId);
}
