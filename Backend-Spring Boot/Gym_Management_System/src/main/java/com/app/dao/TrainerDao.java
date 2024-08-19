package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Trainer;
import com.app.entities.Users;

public interface TrainerDao extends JpaRepository<Trainer, Long> {
	// get department n emp details in a single join query
	@Query("select u from Users u where u.trainer.id = ?1")
	List<Users> findByTrainerId(Long trainerId);

	@Query("SELECT u FROM Trainer u WHERE u.email = :username AND u.password = :password")
    Optional<Trainer> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
 
}
