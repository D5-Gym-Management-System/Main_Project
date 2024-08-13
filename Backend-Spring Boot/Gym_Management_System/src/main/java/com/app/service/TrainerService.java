package com.app.service;

import java.util.List;
//import java.util.Map;

//import javax.validation.constraints.NotNull;

import com.app.dto.ApiResponse;
//import com.app.dto.ProjectDTO;
import com.app.dto.TrainerDTO;

public interface TrainerService {


	TrainerDTO addTrainer(TrainerDTO trainer);
	
	List<TrainerDTO> getAllTrainer();

	ApiResponse assignUserToTrainer(Long trainerId, Long userId);

	ApiResponse removeUserFromTrainer(Long trainerId, Long userId);

	TrainerDTO updateTrainer(Long trainerId, TrainerDTO dto);

	ApiResponse deleteTrainer(Long trainerId);
	

}
