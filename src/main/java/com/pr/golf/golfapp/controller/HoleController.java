package com.pr.golf.golfapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.dto.HoleDTO;
import com.pr.golf.golfapp.service.HoleService;

@RestController
@RequestMapping("/holes")
public class HoleController {

    private final HoleService holeService;

    public HoleController(HoleService holeService) {
        this.holeService = holeService;
    }

    @PostMapping
    public void createHoles(@RequestBody List<HoleDTO> holeDTOs) {
        holeService.createHoles(holeDTOs);
    }
}
