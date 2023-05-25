package com.pr.golf.golfapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.mapper.GolfCourseMapper;
import com.pr.golf.golfapp.model.GolfCourse;
import com.pr.golf.golfapp.model.Hole;
import com.pr.golf.golfapp.repository.GolfCourseRepository;
import com.pr.golf.golfapp.repository.HoleRepository;

@Service
public class GolfCourseService {

    private final GolfCourseRepository golfCourseRepository;
    private final HoleRepository holeRepository;

    private final GolfCourseMapper golfCourseMapper;
    
    public GolfCourseService(@Autowired GolfCourseRepository golfCourseRepository,
    							@Autowired HoleRepository holeRepository,
    							@Autowired GolfCourseMapper golfCourseMapper) {
        this.golfCourseRepository = golfCourseRepository;
        this.holeRepository = holeRepository;
        this.golfCourseMapper = golfCourseMapper;
    }
    
    public GolfCourse getGolfCourseByName(String name) {
    	return golfCourseRepository.findByName(name);
    }

    public void saveOrUpdateGolfCourses(List<GolfCourse> golfCourses) {
        for (GolfCourse golfCourse : golfCourses) {
            String name = golfCourse.getName().replaceAll("\\s", "").toLowerCase();
            Optional<GolfCourse> existingGolfCourse = golfCourseRepository.findByNameIgnoreCase(name);
            if (existingGolfCourse.isPresent()) {
                GolfCourse courseToUpdate = existingGolfCourse.get();
                courseToUpdate.setAddress(golfCourse.getAddress());
                // update any other fields as needed
                golfCourseRepository.save(courseToUpdate);
                // update existing holes or add new holes
                for (Hole newHole : golfCourse.getHoles()) {
                    Optional<Hole> existingHole = courseToUpdate.getHoles().stream()
                            .filter(h -> h.getHoleNumber() == newHole.getHoleNumber())
                            .findFirst();
                    if (existingHole.isPresent()) {
                        Hole holeToUpdate = existingHole.get();
                        // update only the fields that have changed
                        if (newHole.getPar() != holeToUpdate.getPar()) {
                            holeToUpdate.setPar(newHole.getPar());
                        }
                        if (newHole.getName() != null && !newHole.getName().equals(holeToUpdate.getName())) {
                            holeToUpdate.setName(newHole.getName());
                        }
                        if (newHole.getStroke() != holeToUpdate.getStroke()) {
                            holeToUpdate.setStroke(newHole.getStroke());
                        }
                        if (newHole.getWhite() != holeToUpdate.getWhite()) {
                            holeToUpdate.setWhite(newHole.getWhite());
                        }
                        if (newHole.getYellow() != holeToUpdate.getYellow()) {
                            holeToUpdate.setYellow(newHole.getYellow());
                        }
                        if (newHole.getRed() != holeToUpdate.getRed()) {
                            holeToUpdate.setRed(newHole.getRed());
                        }
                        holeRepository.save(holeToUpdate);
                    } else {
                        newHole.setGolfCourse(courseToUpdate);
                        courseToUpdate.getHoles().add(newHole);
                        holeRepository.save(newHole);
                    }
                }
            } else {
            	 GolfCourse savedGolfCourse = golfCourseRepository.save(golfCourse);
                 // set course_id on each hole belonging to this course
                 List<Hole> holes = new ArrayList<>(savedGolfCourse.getHoles());
                 for (Hole hole : holes) {
                     if (hole != null) {
                         hole.setGolfCourse(savedGolfCourse);
                         holeRepository.save(hole);
                     }
                 }
            }
        }
    }


    
    public void saveGolfCourses(List<GolfCourse> golfCourses) {
        for (GolfCourse golfCourse : golfCourses) {
            GolfCourse existingCourse = golfCourseRepository.findByName(golfCourse.getName());
            if (existingCourse != null) {
                golfCourse.setId(existingCourse.getId());
            }
            GolfCourse savedCourse = golfCourseRepository.save(golfCourse);
            List<Hole> holes = golfCourse.getHoles();
            for (Hole hole : holes) {
                hole.setGolfCourse(savedCourse);
                holeRepository.save(hole);
            }
        }
    }
    
    public List<GolfCourse> findAllGolfCourses() {
    	return  golfCourseRepository.findAll();
    }
}

