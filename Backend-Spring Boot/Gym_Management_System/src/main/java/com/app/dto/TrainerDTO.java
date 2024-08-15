package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.TrainerType;
import com.app.entities.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrainerDTO {
	@JsonProperty(access = Access.READ_ONLY) //used during serialization
	private Long id;
	
	
	private String name;
	
	private String email;
	
	@JsonProperty(access=Access.WRITE_ONLY)
	private String password;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate joinDate;
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalDateTime inTime;

	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalDateTime outTime;


	private TrainerType type;
	
	private String imagePath;
	private double salary;
	
	private int age;
	
	@JsonProperty(access = Access.READ_ONLY)
	private List<Users> users = new ArrayList<>();
	
	
	
	
	
	
}
