package com.pr.golf.golfapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.mapper.PlayerMapper;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.repository.PlayerRepository;

@Service
public class PlayerService {

	private PlayerRepository playerRepository;
	
	private PlayerMapper playerMapper;

	public PlayerService(@Autowired PlayerRepository playerRepository,
							@Autowired PlayerMapper playerMapper) {
		this.playerRepository = playerRepository;
		this.playerMapper = playerMapper;
	}

	public List<Player> saveAll(List<Player> players) {
		return playerRepository.saveAll(players);
	}

	public List<Player> update(List<Player> players) {
		return playerRepository.saveAll(players);
	}

	public Optional<Player> findById(Long id) {
		return playerRepository.findById(id);
	}
	
	public Optional<List<Player>> findPlayersByEventId(Long eventId) {
		return Optional.of(playerRepository.findByGolfEvents_Id(eventId));
	}

	public Optional<List<PlayerDTO>> getAllPlayers() {
		// TODO Auto-generated method stub
		return  Optional.of(playerMapper.toDto(playerRepository.findAll()));
	}

}
