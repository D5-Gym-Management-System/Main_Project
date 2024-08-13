package com.app.dao;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.UserDTO;
import com.app.entities.Users;

public interface UserDao extends JpaRepository<Users, Long> {
//	List<Trainer> findByDeptId(long deptId);
//	//finder method for authentication
//		Optional<Trainer> findByEmailAndPassword(String em, String pass);
//
//		// add a finder : JPQL : select e from Employee e where e.dept.id=:id
//		List<Trainer> findByDeptId(Long departmentId);
//
////		List all emp details , joined between a date range
//		List<Trainer> findByJoinDateBetween(LocalDate start, LocalDate end);
//
////		Display all emp details , containing 
//		// specified keyword in their last name
//		List<Trainer> findByLastNameContaining(String keyword);
//
//		// Display all emp details, drawing salary>=specific salary
//		List<Trainer> findBySalaryGreaterThanEqual(double minSal);
//
////		Display top 2 salaried emps
//		List<Trainer> findTop2ByOrderBySalaryDesc();
//
//		// list emps whose adhaar card is created before specific date
//		List<Trainer> findByCardCreatedOnBefore(LocalDate date);
//		//list emps  by in time
//		List<Trainer> findByInTime(LocalDateTime inTime);
		
	
	 @Query("SELECT u FROM Users u WHERE u.email = :username AND u.password = :password")
	    Optional<Users> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
	 
	 @Query("SELECT u FROM Users u WHERE u.email = :username")
	    Optional<Users> findByEmailId(@Param("username") String username);

}
