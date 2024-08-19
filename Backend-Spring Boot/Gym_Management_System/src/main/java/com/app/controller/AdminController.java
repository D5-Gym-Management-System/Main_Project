package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.dto.TrainerDTO;
import com.app.dto.UserDTO;
import com.app.entities.Admin;
import com.app.service.AdminService;
import com.app.service.TrainerService;
import com.app.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    // Get all users
    @GetMapping
    public ResponseEntity<?> getAllAdmin() {
        List<AdminDTO> admin = adminService.getAlladmin();
        if (admin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(admin);
    }



    // Add a new trainer
    @PostMapping
    public ResponseEntity<?> addAdmin(@RequestBody @Valid AdminDTO admindto) {
        ApiResponse response= adminService.addAdmin(admindto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    
}
