package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Trainer;
import com.app.entities.TrainerUserDetails;
import com.app.entities.TrainerUserId;
import com.app.entities.Membership;

public interface UserTrainerDetailsDao extends JpaRepository<TrainerUserDetails, TrainerUserId> {
//delete all details by specified emp id (use case : delete emp details)
//	int deleteByMyUserId(Long userId);
//
//	// delete all details by specified project id (use case : delete project details)
//	int deleteByMyTrainerId(Long trainerId);
//	//get all emps by a project id  myProject
//	@Query("select p.myEmployee from ProjectEmployeeDetails p where p.myProject.id=:projectId")
//	List<Trainer> findByTrainerId(Long trainerId);
//	//get all projects assigned for the emp
//	@Query("select p.myProject from ProjectEmployeeDetails p where p.myEmployee.id=:empId")
//	List<Membership> findByUserId(Long userId);
//	
	

}
