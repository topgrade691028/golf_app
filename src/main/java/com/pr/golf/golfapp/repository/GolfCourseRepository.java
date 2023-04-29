package com.pr.golf.golfapp.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.GolfCourse;

@Repository
public interface GolfCourseRepository extends JpaRepository<GolfCourse, Long>{

	   
	   GolfCourse findByName(String name);
	   
	   @Query(value = "SELECT * FROM golf_course WHERE LOWER(name) = LOWER(:name)", nativeQuery = true)
	   Optional<GolfCourse> findByNameIgnoreCase(@Param("name") String name);

	   @Query(value = "SELECT * FROM golf_course WHERE LOWER(name) IN (:names)", nativeQuery = true)
	   List<GolfCourse> findByNamesIgnoreCase(@Param("names") Collection<String> names);

}
