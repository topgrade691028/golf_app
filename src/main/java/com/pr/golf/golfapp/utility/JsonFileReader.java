package com.pr.golf.golfapp.utility;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pr.golf.golfapp.model.Score;

import lombok.experimental.UtilityClass;

@UtilityClass
public class JsonFileReader {
	
	public static void main(String [] args) {
		ObjectMapper objectMapper = new ObjectMapper();
		String fileName = "src\\test\\resources\\scores\\player1_silvermere_scores.json";
		JsonFileReader jsonFileReader = new JsonFileReader();

		jsonFileReader.getListFromFile(Score.class, fileName);
		
	}
	
	public List<?> getListFromFile(Class<?> classType, String fileName) {
		ObjectMapper objectMapper = new ObjectMapper();
		File file = new File(fileName);
		List<?> listOfValues = null;
		try {
			listOfValues = objectMapper.readValue(file,new TypeReference<List>(){});
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(listOfValues);
		return listOfValues;
	}

}
