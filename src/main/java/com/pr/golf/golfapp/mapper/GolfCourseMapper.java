package com.pr.golf.golfapp.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.GolfCourseDTO;
import com.pr.golf.golfapp.model.GolfCourse;

@Service
public class GolfCourseMapper {

	private HoleMapper holeMapper;

	public GolfCourseMapper(@Autowired HoleMapper holeMapper) {
		this.holeMapper = holeMapper;
	}

	public GolfCourse toEntity(GolfCourseDTO golfCourseDTO) {
		GolfCourse golfCourse = new GolfCourse();
		golfCourse.setId(golfCourseDTO.getId());
		golfCourse.setName(golfCourseDTO.getName());
		golfCourse.setAddress(golfCourseDTO.getAddress());
		golfCourse.setHoles(holeMapper.toEntity(golfCourseDTO.getHoles()));

		return golfCourse;
	}

	public GolfCourseDTO toDto(GolfCourse golfCourse) {
		GolfCourseDTO golfCourseDTO = new GolfCourseDTO();
		golfCourseDTO.setId(golfCourseDTO.getId());
		golfCourseDTO.setName(golfCourseDTO.getName());
		golfCourseDTO.setAddress(golfCourseDTO.getAddress());
		golfCourseDTO.setHoles(holeMapper.toDto(golfCourse.getHoles()));

		return golfCourseDTO;
	}

	public List<GolfCourseDTO> toDto(List<GolfCourse> golfCourses) {
		List<GolfCourseDTO> golfCourseDTOs = new ArrayList<GolfCourseDTO>(golfCourses.size());
		for (GolfCourse golfCourse : golfCourses) {
			golfCourseDTOs.add(toDto(golfCourse));
		}
		return golfCourseDTOs;
	}

}
