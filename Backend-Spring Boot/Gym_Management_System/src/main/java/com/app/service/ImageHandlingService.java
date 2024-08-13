package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entities.Trainer;

public interface ImageHandlingService {
	ApiResponse uploadImage(Long userId, MultipartFile image) throws IOException;
	byte[] serveImage(Long empId) throws IOException;
	//used for uploading img along with emp details
	void uploadImage(Trainer trainer, MultipartFile image) throws IOException;
}
