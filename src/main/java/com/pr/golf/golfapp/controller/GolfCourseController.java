package com.pr.golf.golfapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.model.GolfCourse;
import com.pr.golf.golfapp.service.GolfCourseService;

@RestController
public class GolfCourseController {

    private final GolfCourseService golfCourseService;

    @Autowired
    public GolfCourseController(GolfCourseService golfCourseService) {
        this.golfCourseService = golfCourseService;
    }

    @PostMapping("/golfcourses")
    public ResponseEntity<String> createGolfCourses(@RequestBody List<GolfCourse> golfCourses) {
        try {
 
            golfCourseService.saveOrUpdateGolfCourses(golfCourses);
            return new ResponseEntity<>("Successfully created or updated golf courses", HttpStatus.CREATED);
        } catch (Exception e) {
        	System.out.print("Failed to create or udpated golf courses " + e);
            return new ResponseEntity<>("Failed to create or update golf courses", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
