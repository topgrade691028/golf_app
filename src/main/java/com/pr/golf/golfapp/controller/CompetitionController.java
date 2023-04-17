package com.pr.golf.golfapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.service.CompetitionService;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    private CompetitionService competitionService;
    
    public CompetitionController(@Autowired CompetitionService competitionService) {
    	this.competitionService = competitionService;
    }
}
