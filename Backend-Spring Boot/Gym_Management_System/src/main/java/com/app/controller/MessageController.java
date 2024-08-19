package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.app.entities.Message;
import com.app.service.MessageService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/messages")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageController {
	// dep
	@Autowired
	private MessageService messageService;

	// add new department
	// http://host:port/departments
	@PostMapping
	public ResponseEntity<?> addNewMessage(@RequestBody 
			@Valid Message msg) {
		System.out.println("in add message " + msg);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(messageService.addNewMessage(msg));

	}

	// get department details
	// http://host:port/departments/{deptId}
	@GetMapping
	public ResponseEntity<?> getMessage() {
		System.out.println("in get messages ");
		return ResponseEntity
				.ok(messageService.getMessages());
	} 


}


