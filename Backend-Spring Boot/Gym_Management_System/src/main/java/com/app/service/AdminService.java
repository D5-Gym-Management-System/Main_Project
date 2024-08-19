package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.dto.TrainerDTO;
import com.app.dto.UserDTO;
import com.app.entities.Admin;

public interface AdminService {
	
     //Retrieves a list of all trainers.
    List<AdminDTO> getAlladmin();
 

    // Adds a new trainer.   
    ApiResponse addAdmin( AdminDTO admindto);
}










