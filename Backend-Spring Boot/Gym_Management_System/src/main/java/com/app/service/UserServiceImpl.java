package com.app.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;

import com.app.dao.TrainerDao;
import com.app.dao.UserDao;
import com.app.dao.UserTrainerDetailsDao;
import com.app.dto.ApiResponse;

import com.app.dto.UserDTO;

import com.app.entities.Trainer;
import com.app.entities.Users;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	// dep
	@Autowired
	private UserDao userRepo;

//	@Autowired
//	private AddressDao adrRepo;

	@Autowired
	private TrainerDao trainerRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private ImageHandlingService imgHandlingService;

	@Autowired
	private UserTrainerDetailsDao userTrainerRepo;

	@Override
	public List<UserDTO> getAllUsersFromTrainer(Long trainerId) {
		List<Users> userList = trainerRepo.findByTrainerId(trainerId);
		return userList.stream().map(emp -> mapper.map(emp, UserDTO.class)).collect(Collectors.toList());
	}
	

	public UserDTO getUserByUsernameAndPassword(String username, String password) {
	    // Assuming userRepo is your repository and mapper is used for conversion
	    Optional<Users> userOptional = userRepo.findByUsernameAndPassword(username, password);
	    
	    return userOptional.map(user -> mapper.map(user, UserDTO.class)).orElse(null);
	}
	
	@Override
	public List<UserDTO> getAllUsers() {
	    List<Users> userList = userRepo.findAll();  // `findAll()` returns a List<Users>
	    return userList.stream()
	                   .map(users -> mapper.map(users, UserDTO.class))
	                   .collect(Collectors.toList());
	}

	
	

	@Override
	public ApiResponse deleteUserDetails(Long userId) {
		// checking if adr is assigned for this emp 
//		Optional<Address> optionalAdr = adrRepo.findById(userId);
//		if (optionalAdr.isPresent()) // child rec : adr exists ,so first delete that
//			adrRepo.delete(optionalAdr.get());
		
		Users user = userRepo.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("Invalid emp id"));

		// Before deleting emp rec , delete it's child rec from ProjectEmpDetails
//		userTrainerRepo.deleteByMyUserId(userId);// yet to be tested
		userRepo.delete(user);// yet to be tested
		return new ApiResponse("user Details of user with ID " + user.getId() + " deleted....");
	}

	@Override
	public UserDTO addNewUser(UserDTO dto) {

		// validate confirm password
		if (dto.getPassword().equals(dto.getConfirmPassword())) {
			// validate dept id
//			Department dept = deptRepo.findById(dto.getDeptId())
//					.orElseThrow(() -> new ResourceNotFoundException("Invalid Dept Id!!!"));
			Users empEntity = mapper.map(dto, Users.class);
//			dept.addUser(empEntity);
			Users savedUser = userRepo.save(empEntity);
			System.out.println("emp entity id " + empEntity.getId() + " " + savedUser.getId());
			return mapper.map(savedUser, UserDTO.class);			
		}
		throw new ApiException("Passwords don't match");

	}

	@Override
	public UserDTO updateUser(Long userId, UserDTO dto) {
		// validate if emp exists by id
		Users user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user ID , user not found !!!!"));
		// => emp exists
		// validate confirm password
		try {
			// validate dept
//			Department dept = deptRepo.findById(dto.getDeptId())
//					.orElseThrow(() -> new ResourceNotFoundException("Invalid Dept Id!!!"));			// dto contains the updates , so apply it --> to entity
			mapper.map(dto, user);
			System.out.println("after mapping " + user);
//			dept.addEmployee(emp);		
			dto.setId(userId);// so that it doesn't send null in the json resp
			return dto;
		}
		catch(Exception e) {
		throw new ApiException("Passwords don't match");
		}
	}

	@Override
	public UserDTO getUserDetails(Long trainerId, Long userId) {
		Users user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Emp ID!!!"));
		// chk if emp belongs to the specified dept : validation !
		if (user.getTrainer().getId() != trainerId)
			throw new ResourceNotFoundException("Dept id does not match !!!");

		return mapper.map(user, UserDTO.class);
	}

	@Override
	public List<UserDTO> getAllUser(int pageNumber, int pageSize) {
		// Creates a PageRequest(imple class of Pageable : i/f for pagination)
		// based upon page no n size
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		// fetches the Page of Emps --> getContent() --> List<Emp>
		List<Users> userList = userRepo.findAll(pageable).getContent();
		return userList.
				stream() //Stream<Emp>
				//Stream i/f method - map(Function mapperFunction)
				.map(user -> mapper.map(user, UserDTO.class)) //Stream<dto>
				.collect(Collectors.toList());
	}

	@Override
	public UserDTO addNewUserWithImage(UserDTO dto, MultipartFile image) throws IOException {

		// validate confirm password
		if (dto.getPassword().equals(dto.getConfirmPassword())) {
			// validate dept id
			Trainer trainer= trainerRepo.findById(dto.getTrainerId())
					.orElseThrow(() -> new ResourceNotFoundException("Invalid Dept Id!!!"));
			Users userEntity = mapper.map(dto, Users.class);
			// upload image , set image path to emp.
			imgHandlingService.uploadImage(userEntity.getTrainer(), image);
			trainer.addUser(userEntity);
			Users savedUser= userRepo.save(userEntity);// Actually not needed by hibernate BUT to get persistent emp id
														// n to send to clnt doing this !
			// System.out.println("emp entity id " + empEntity.getId() + " " +
			// savedEmp.getId());

			return mapper.map(savedUser, UserDTO.class);

		}
		throw new ApiException("Passwords don't match");
	}


	@Override
	public ApiResponse updateUserUsingEmail(String emailId, String password) {
		// validate if emp exists by id
		Users user = userRepo.findByEmailId(emailId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user ID , user not found !!!!"));
		// => emp exists
		// validate confirm password
		try {
			// validate dept
//			Department dept = deptRepo.findById(dto.getDeptId())
//					.orElseThrow(() -> new ResourceNotFoundException("Invalid Dept Id!!!"));			// dto contains the updates , so apply it --> to entity
//			mapper.map(dto, user);
			System.out.println("after mapping " + user);
//			dept.addEmployee(emp);		
			user.setPassword(password);;// so that it doesn't send null in the json resp
			return new ApiResponse("Password updated successfully");
		}
		catch(Exception e) {
		throw new ApiException("Passwords don't match");
		}
	}

//	@Override
//	public List<UserDTO> getUserByInTime(LocalDateTime inTime) {
//		// TODO Auto-generated method stub
//		return userRepo.
//				findByInTime(inTime)
//				.stream()
//				.map(us -> mapper.map(us,UserDTO.class))
//				.collect(Collectors.toList());
//	}


}
