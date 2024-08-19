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
import com.app.entities.Support;
import com.app.service.MessageService;
import com.app.service.SupportService;

@RestController
@RequestMapping("/support")
@Validated
public class SupportController {
	@Autowired
	private SupportService supportService;
	
	SupportController(){
		System.out.println("In ctor of "+getClass());
	}

	// add new department
	// http://host:port/departments
	@PostMapping
	public ResponseEntity<?> addNewSupport(@RequestBody 
			@Valid Support msg) {
		System.out.println("in add supportmessage " + msg);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(supportService.addNewSupportMessage(msg));

	}

	// get department details
	// http://host:port/departments/{deptId}
	@GetMapping
	public ResponseEntity<?> getSupportmsg() {
		System.out.println("in get support messages ");
		return ResponseEntity
				.ok(supportService.getsupportMessages());
	} 
}
//
//}

