package com.pr.golf.golfapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{

}
