package com.pr.golf.golfapp.helper;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.pr.golf.golfapp.model.GolfCourse;
import com.pr.golf.golfapp.utility.JsonMapper;

public class ReadDTOFromFileAndPersistToDB {
	
    static final String directoryPath = "src/test/resources/courses/";
    
    static final String uri = "http://localhost:8080/golfcourses";

	public static void main(String [] args) throws IOException {
	    

        JsonMapper<GolfCourse> courseMapper = new JsonMapper<>(GolfCourse.class);
        File folder = new File(directoryPath);
        File[] files = folder.listFiles();
       
        List<GolfCourse> courses = courseMapper.getObjectList(files);
        courseMapper.postObjectList(uri, courses);
	}
}
