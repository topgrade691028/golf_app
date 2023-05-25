package com.pr.golf.golfapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pr.golf.golfapp.model.PlayerGrouping;

import jakarta.transaction.Transactional;

public interface GolfEventPlayerGrouping extends JpaRepository<PlayerGrouping, Long>{

    // Custom queries for PlayerGroupingRepository

    @Query(value = "INSERT INTO player_grouping (event_id, group_number, player_id) VALUES (:eventId, :groupNumber, :playerId)", nativeQuery = true)
    @Modifying
    @Transactional
    void insertPlayerGroups(@Param("eventId") Long eventId, @Param("groupNumber") int groupNumber, @Param("playerId") Long playerId);

    @Query(value = "UPDATE player_grouping SET player_id = :playerId WHERE event_id = :eventId AND grouping_id = :groupId", nativeQuery = true)
    @Modifying
    @Transactional
    void updateGroupingWithNewPlayer(@Param("eventId") Long eventId, @Param("groupId") Long groupId, @Param("playerId") Long playerId);

    @Query(value = "DELETE FROM player_grouping WHERE event_id = :eventId AND grouping_id = :groupId", nativeQuery = true)
    @Modifying
    @Transactional
    void deletePlayerFromGrouping(@Param("eventId") Long eventId, @Param("groupId") Long groupId);

    // ... other custom queries or methods

}
