package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Message;
import com.app.entities.Trainer;
import com.app.entities.Users;

public interface MessageDao extends JpaRepository<Message, Long> {
	
}
