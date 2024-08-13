package com.app.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.UserDTO;


public interface UserService {
//get list of emps from a specific dept
	List<UserDTO> getAllUsersFromTrainer(Long trainerId);

//delete emp details
	ApiResponse deleteUserDetails(Long empId);

	UserDTO addNewUser(UserDTO dto);
	
	
	UserDTO updateUser(Long userId, UserDTO dto);

	UserDTO getUserDetails(Long trainerId, Long empId);

	// get all emps : pagination
	List<UserDTO> getAllUser(int pageNumber, int pageSize);

	// add emp n it's image details in a single request
	UserDTO addNewUserWithImage(UserDTO dto, MultipartFile image) throws IOException;

	public UserDTO getUserByUsernameAndPassword(String username, String password);

	ApiResponse updateUserUsingEmail(String emailId,String password);
	
	List<UserDTO> getAllUsers();
}
