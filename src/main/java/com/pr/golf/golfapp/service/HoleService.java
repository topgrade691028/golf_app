package com.pr.golf.golfapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.HoleDTO;
import com.pr.golf.golfapp.mapper.HoleMapper;
import com.pr.golf.golfapp.model.Hole;
import com.pr.golf.golfapp.repository.HoleRepository;

@Service
public class HoleService {

    private final HoleMapper holeMapper;
    private final HoleRepository holeRepository;

    public HoleService(HoleMapper holeMapper, HoleRepository holeRepository) {
        this.holeMapper = holeMapper;
        this.holeRepository = holeRepository;
    }

    public void createHoles(List<HoleDTO> holeDTOs) {
        List<Hole> holes = holeDTOs.stream()
                .map(holeMapper::toEntity)
                .collect(Collectors.toList());
        holeRepository.saveAll(holes);
    }
}
