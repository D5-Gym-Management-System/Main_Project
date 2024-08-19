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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TrainerDTO {
	@JsonProperty(access = Access.READ_ONLY) //used during serialization
	private Long id;
	
	
	private String name;
	
	private String email;
	
	@JsonProperty(access=Access.WRITE_ONLY)
	private String password;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate joinDate;
	@DateTimeFormat(pattern = "HH:mm")
	private LocalTime inTime=LocalTime.of(LocalTime.now().getHour(), LocalTime.now().getMinute());

	@DateTimeFormat(pattern = "HH:mm")
	private LocalTime outTime=LocalTime.of(LocalTime.now().plusHours(8).getHour(), LocalTime.now().getMinute());


	private TrainerType trainerType;
	
	private String imagePath;
	private int salary;
	
	private int age;
	
	@JsonProperty(access = Access.READ_ONLY)
	private List<Users> users = new ArrayList<>();
	

	
	
	
	
}
