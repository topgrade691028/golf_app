package com.pr.golf.golfapp.converter;


import com.pr.golf.golfapp.enums.CompetitionType;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CompetitionTypeConverter implements AttributeConverter<CompetitionType, String> {

	@Override
	public String convertToDatabaseColumn(CompetitionType attribute) {
	    if (attribute == null) {
	        return null;
	    }
	    return attribute.name();
	}

	@Override
	public CompetitionType convertToEntityAttribute(String dbData) {
	    if (dbData == null) {
	        return null;
	    }
	    return CompetitionType.valueOf(dbData);
	}


}
