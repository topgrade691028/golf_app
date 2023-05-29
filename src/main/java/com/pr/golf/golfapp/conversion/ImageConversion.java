package com.pr.golf.golfapp.conversion;

import net.sourceforge.tess4j.Tesseract;
import org.junit.jupiter.api.Assertions;

import java.io.File;
public class ImageConversion {
    public static void main(String[] args) throws Exception { // main method for extracting text from image
        File image = new File("src/main/resources/images/silvermere.jpg");
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("src/main/resources/tessdata");
        tesseract.setLanguage("eng");
        tesseract.setPageSegMode(1);
        tesseract.setOcrEngineMode(1);
        tesseract.setHocr(true);
        String result = tesseract.doOCR(image);

        //log.info(result);

        //Assertions.assertTrue(result.contains("Der ,.schnelle” braune Fuchs springt"));
        //Assertions.assertTrue(result.contains("salta sopra il cane pigro. El zorro"));
    }
}