package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.MembershipType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	@JsonProperty(access = Access.READ_ONLY) // used during serialization
	private Long id;
	@NotBlank
	private String name;
	@Email
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY) //required only in de-ser.
	private String password;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String confirmPassword;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate membershipStart;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate membershipEnd;
//	 @JsonDeserialize(using = MembershipTypeDeserializer.class)
	private MembershipType type;
	private double membershipCost;
	@JsonProperty(access = Access.READ_ONLY) // used during de-serialization
	private Long trainerId;
	private int age;
	
}
