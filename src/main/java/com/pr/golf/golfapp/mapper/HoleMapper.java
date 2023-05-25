package com.pr.golf.golfapp.mapper;

import java.util.ArrayList;
import java.util.List;

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
    
    public List<Hole> toEntity(List<HoleDTO> dtos) {
    	List<Hole> holes = new ArrayList<>(dtos.size());
    	for(int i = 0; i < dtos.size(); i++ ) {
    		holes.add(toEntity(dtos.get(i)));
    	}
    	return holes;
    }
    
    public HoleDTO toDTO(Hole hole) {
        HoleDTO holeDto = new HoleDTO();
        holeDto.setHoleNumber(holeDto.getHoleNumber());
        holeDto.setPar(holeDto.getPar());
        holeDto.setWhite(holeDto.getWhite());
        holeDto.setYellow(holeDto.getYellow());
        holeDto.setRed(holeDto.getRed());
        holeDto.setStroke(holeDto.getStroke());
        holeDto.setCourseId(hole.getGolfCourse().getId());

        return holeDto;
    }
    
    
    public List<HoleDTO> toDto(List<Hole> entities) {
    	List<HoleDTO> holeDtos = new ArrayList<>(entities.size());
    	for(int i = 0; i < entities.size(); i++ ) {
    		holeDtos.add(toDTO(entities.get(i)));
    	}
    	return holeDtos;
    }
}
