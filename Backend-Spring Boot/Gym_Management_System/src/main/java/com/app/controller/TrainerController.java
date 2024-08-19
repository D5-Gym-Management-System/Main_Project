package com.app.controller;

import java.io.IOException;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TrainerDTO;
import com.app.dto.UserDTO;
import com.app.dto.UserTrainerDTO;
import com.app.service.TrainerService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/trainer")
@Validated
@Getter
@Setter

public class TrainerController {
	@Autowired
	private TrainerService trainerService;
	

	public TrainerController() {
		System.out.println("in ctor of " + getClass());
	}

	// launch new trainer
	// http://host:port/trainers , method=POST
	@PostMapping
	public ResponseEntity<?> addNewTrainer(@RequestBody @Valid TrainerDTO trainerdto) {
		System.out.println("in add trainer " + trainerdto);
		return ResponseEntity.status(HttpStatus.CREATED).body(trainerService.addTrainer(trainerdto));
	}

	@GetMapping(value = "/{username}/{password}")
	public ResponseEntity<?> getTrainerDetailsByUsernameAndPassword(
	    @PathVariable String username, 
	    @PathVariable String password) throws IOException {

	    System.out.println("get details by username and password " + 
	        "username -> " + username + ", password -> " + password);
	    
	    // Fetch user details
	    TrainerDTO trainerDTO = trainerService.getUserByUsernameAndPassword(username, password);
	    
	    // Return the user details
	    if (trainerDTO != null) {
	        return ResponseEntity.ok(trainerDTO);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trainer not found");
	    }
	}

	@GetMapping
	public ResponseEntity<?> getAlltrainers() {
		System.out.println("in get all trainers");
		return ResponseEntity.ok(trainerService.getAllTrainer());
	}
	
	@GetMapping("/{trainerId}")
	public ResponseEntity<?> getAllUsersByTrainer(Long trainerId) {
		System.out.println("in get all trainers");
		return ResponseEntity.ok(trainerService.getAllUsersByTrainer(trainerId));
	}

	// http://host:port/trainers/users , method=POST
	@PostMapping("/traineruser")
	@Operation(summary = "Assign user to trainer")
	public ResponseEntity<?> adduserTotrainer(@RequestBody UserTrainerDTO traineruser) {
		System.out.println("in add user to proj " + traineruser);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(trainerService.assignUserToTrainer(traineruser.getTrainer_id() ,traineruser.getUser_id() ));
	}

	// http://host:port/trainers/users , method=DELETE
	@DeleteMapping("/{trainerId}/{userId}")
	@Operation(summary = "Removing an user from the trainer")
	public ResponseEntity<?> removeuserFromtrainer(@PathVariable Long trainerId,@PathVariable Long userId) {
		System.out.println("in rem user to trainer " + userId);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(trainerService.removeUserFromTrainer(trainerId, userId));
	}

	// http://host:port/trainers , method=PUT
	@PutMapping("/{trainerId}")
	@Operation(summary = "Updating Complete trainer details")
	public ResponseEntity<?> updatetrainer(@PathVariable Long trainerId, @RequestBody @Valid TrainerDTO trainerdto) {
		System.out.println("in update proj " + trainerId + " " + trainerdto);
		return ResponseEntity.ok().body(trainerService.updateTrainer(trainerId, trainerdto));
	}

	
	// http://host:port/trainers , method=DELETE
	@DeleteMapping("/{trainerId}")
	@Operation(summary = "Deleting trainer details")
	public ResponseEntity<?> deletetrainer(@PathVariable Long trainerId) {
		System.out.println("in delete proj " + trainerId);
		return ResponseEntity.ok().body(trainerService.deleteTrainer(trainerId));
	}

//	// update trainer details partial
//	// http://host:port/trainers/{trainerId} , method=PATCH
//	@PatchMapping("/{trainerId}")
//	@Operation(summary = "Partial updation of trainer details")
//	public ResponseEntity<?> updatetrainerDetails(@PathVariable @NotNull Long trainerId,
//			@RequestBody Map<String, Object> map) throws Exception {
//		System.out.println("in partial update adr " + trainerId + " " + map);
//		return ResponseEntity.ok().body(trainerService.patchtrainerDetails(trainerId, map));
//	}
//


}
