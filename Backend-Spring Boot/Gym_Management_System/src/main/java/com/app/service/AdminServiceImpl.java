package com.app.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TrainerDao;
import com.app.dao.UserDao;
import com.app.dto.TrainerDTO;
import com.app.dto.UserDTO;
import com.app.entities.Trainer;
import com.app.entities.Users;
import com.app.service.AdminService;

import java.util.List;
import java.util.stream.Collectors;

import com.app.dto.TrainerDTO;
import com.app.dto.UserDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AdminDao;
import com.app.dao.TrainerDao;
import com.app.dao.UserDao;
import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.dto.TrainerDTO;
import com.app.dto.UserDTO;
import com.app.entities.Admin;



@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	 @Autowired
	    private AdminDao adminRepo;

	    @Autowired
	    private ModelMapper mapper;

	    @Override
	    public List<AdminDTO> getAlladmin() {
	        List<Admin> admins = adminRepo.findAll();
	        return admins.stream()
	                       .map(admin -> mapper.map(admin, AdminDTO.class))
	                       .collect(Collectors.toList());
	    }

		@Override
		public ApiResponse addAdmin(AdminDTO admin) {
			Admin admintoadd= mapper.map(admin,Admin.class);
			adminRepo.save(admintoadd);
			return new ApiResponse("admin added sucessfully");
		}

	   
}
