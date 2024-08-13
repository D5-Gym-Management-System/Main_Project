package com.app.service;

import java.util.List;
//import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dao.TrainerDao;
import com.app.dao.UserTrainerDetailsDao;
import com.app.dto.ApiResponse;
//import com.app.dto.ProjectDTO;
import com.app.dto.TrainerDTO;
import com.app.entities.Trainer;
import com.app.entities.TrainerUserDetails;
import com.app.entities.TrainerUserId;
import com.app.entities.Users;
import com.app.entities.Membership;

@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {
	@Autowired
	private TrainerDao trainerRepo;

	@Autowired
	private UserDao userRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private UserTrainerDetailsDao TrainerUserRepo;

	@Override
	public TrainerDTO addTrainer(TrainerDTO dto) {
		// map dto --> entity
		Trainer project = mapper.map(dto, Trainer.class);
		// project.setStatus(ProjectStatus.LAUNCHED);
		Trainer savedProject = trainerRepo.save(project);
		return mapper.map(savedProject, TrainerDTO.class);
	}

	@Override
	public List<TrainerDTO> getAllTrainer() {
		return trainerRepo.findAll()
				.stream()
				.map(project -> mapper.map(project, TrainerDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse assignUserToTrainer(Long trainerId, Long userId) {
		Trainer trainer = trainerRepo.getReferenceById(trainerId);
//				.findById(projectId)
//				.orElseThrow(() -> new ResourceNotFoundException("Invalid Project ID!!!!"));
		Users user = userRepo.getReferenceById(userId);

		// .findById(empId).orElseThrow(() -> new ResourceNotFoundException("Invalid Emp
		// ID!!!!"));

		// Not needed ! ProjectEmployeeId id=new ProjectEmployeeId(projectId, empId);
		TrainerUserDetails details = new TrainerUserDetails();
		details.setTrainer(trainer); //establishing many-to-one uni dir asso : projempdetails --> emp
		details.setUser(user);//establishing many-to-one uni dir asso : projempdetails --> project
		TrainerUserRepo.save(details);
		return new ApiResponse("user  added to trainer: ");
	}//rec will be inserted in asso table

	@Override
	public ApiResponse removeUserFromTrainer(Long trainerId, Long userId) {

		// Currently not added any  validations to chk if projectId n emp Id : exists
		// You can add them (refer to earlier method)
		TrainerUserId id = new TrainerUserId(trainerId, userId);
		TrainerUserRepo.deleteById(id);
		return new ApiResponse("delete user details from specified trainer");
	}

	@Override
	public TrainerDTO updateTrainer(Long trainerId, @Valid TrainerDTO dto) {
		// validate if project exists by id
		Trainer trainer = trainerRepo.findById(trainerId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Project Id !!!"));
		// => project exists
		// dto contains the updates , so apply it --> to entity
		mapper.map(dto, trainer);
		System.out.println("after mapping " + trainerId);
		trainerRepo.save(trainer);
		dto.setId(trainerId);// so that it doesn't send null in the json resp
		return dto;
	}

	@Override
	public ApiResponse deleteTrainer(Long trainerId) {
		// delete child records in from child table (entity : ProjectEmp)
//		long noOfEmpsInProject = TrainerUserRepo.deleteByMyProjectId(trainerId);
//		System.out.println("deleted " + noOfEmpsInProject);
		// delete project details : currently assuming projectId exists , later you can add
		// a check
		trainerRepo.deleteById(trainerId);
		return new ApiResponse("Deleted project details ....");
	}

	
	
	

}
