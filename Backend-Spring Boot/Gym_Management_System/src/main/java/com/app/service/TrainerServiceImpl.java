package com.app.service;

import java.util.List;
import java.util.Optional;
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
import com.app.dto.UserDTO;
import com.app.entities.Trainer;
import com.app.entities.TrainerUserDetails;
import com.app.entities.TrainerUserId;
import com.app.entities.Users;

@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {
	@Autowired
	private TrainerDao trainerRepo;

	@Autowired
	private UserDao userRepo;
	
	@Autowired
    private UserTrainerDetailsDao userTrainerDetailsDao; // Inject the UserTrainerDetailsDao

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
//	    		findById(trainerId).orElseThrow(() -> new ResourceNotFoundException("Invalid trainer ID: " + trainerId));
	   
	    Users user = userRepo.getReferenceById(userId);
//	    		findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID: " + userId));

	    // Check if the association already exists to prevent duplication
	    TrainerUserId id = new TrainerUserId(trainerId, userId);
	    if (TrainerUserRepo.existsById(id)) {
	        return new ApiResponse("User is already assigned to this trainer.");
	    }

	    TrainerUserDetails details = new TrainerUserDetails();
	    details.setTrainer(trainer);
	    details.setUser(user);
	    details.setMemberId(id);
	    trainer.addUser(user);
	    TrainerUserRepo.save(details);
	    return new ApiResponse("User added to trainer successfully.");
	}


	@Override
	public ApiResponse removeUserFromTrainer(Long trainerId, Long userId) {

	    Trainer trainer = trainerRepo.findById(trainerId)
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid Trainer Id !!!"));
	    Users usertomatch = userRepo.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid User Id !!!"));
	    
	    // Disassociate users from the trainer without removing them
	    List<Users> users = trainer.getUsers();
	    users.forEach(user -> {
	    	if(user==usertomatch)
	    	{ 
	    	user.setTrainer(null);
	        userRepo.save(user); // Save each user to update the trainer reference
	    	
	    	}
	    	});
	    
	    // Delete associated records in user_trainer_details
	    userTrainerDetailsDao.deleteByMemberId_TrainerId(trainerId);
		return new ApiResponse("delete user details from specified trainer");
	}

	@Override
	public TrainerDTO updateTrainer(Long trainerId, @Valid TrainerDTO dto) {
		// validate if project exists by id
		Trainer trainer = trainerRepo.findById(trainerId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Project Id !!!"));
		mapper.map(dto, trainer);
		System.out.println("after mapping " + trainerId);
		trainerRepo.save(trainer);
		dto.setId(trainerId);// so that it doesn't send null in the json resp
		return dto;
	}

	@Override
	public ApiResponse deleteTrainer(Long trainerId) {
	    // Find the trainer to be deleted
	    Trainer trainer = trainerRepo.findById(trainerId)
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid Trainer Id !!!"));
	    
	    // Disassociate users from the trainer without removing them
	    List<Users> users = trainer.getUsers();
	    users.forEach(user -> {
	        user.setTrainer(null);
	        userRepo.save(user); // Save each user to update the trainer reference
	    });
	    
	    // Delete associated records in user_trainer_details
	    userTrainerDetailsDao.deleteByMemberId_TrainerId(trainerId);
	    
	    // Now delete the trainer
	    trainerRepo.deleteById(trainerId);
	    
	    return new ApiResponse("Deleted trainer details, users retained.");
	}

	public List<UserDTO> getAllUsersByTrainer(Long trainerId) {
        // Fetch the Trainer entity by its ID
        Trainer trainer = trainerRepo.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with ID: " + trainerId));

        // Get the list of Users associated with the Trainer
        List<Users> users = trainer.getUsers();

        // Map the Users to UserDTO
        return users.stream()
                .map(user -> mapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

	@Override
	public TrainerDTO getUserByUsernameAndPassword(String username, String password) {
		  Optional<Trainer> trainerOptional = trainerRepo.findByUsernameAndPassword(username, password);
		    
		    return trainerOptional.map(trainer -> mapper.map(trainer, TrainerDTO.class)).orElse(null);
		
	}
	


}
