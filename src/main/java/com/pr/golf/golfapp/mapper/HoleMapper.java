package com.pr.golf.golfapp.mapper;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.HoleDTO;
import com.pr.golf.golfapp.model.GolfCourse;
import com.pr.golf.golfapp.model.Hole;
import com.pr.golf.golfapp.repository.GolfCourseRepository;

@Component
public class HoleMapper {

    private final GolfCourseRepository golfCourseRepository;

    public HoleMapper(GolfCourseRepository golfCourseRepository) {
        this.golfCourseRepository = golfCourseRepository;
    }

    public Hole toEntity(HoleDTO dto) {
        Hole entity = new Hole();
        entity.setHoleNumber(dto.getHoleNumber());
        entity.setPar(dto.getPar());
        entity.setWhite(dto.getWhite());
        entity.setYellow(dto.getYellow());
        entity.setRed(dto.getRed());
        entity.setStroke(dto.getStroke());

        GolfCourse course = golfCourseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course with ID " + dto.getCourseId() + " not found"));
        entity.setGolfCourse(course);

        return entity;
    }
}
