package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Trainer;
import com.app.entities.Users;

public interface TrainerDao extends JpaRepository<Trainer, Long> {
	// get department n emp details in a single join query
	@Query("select u from Users u where u.trainer.id = ?1")
	List<Users> findByTrainerId(Long trainerId);

}
