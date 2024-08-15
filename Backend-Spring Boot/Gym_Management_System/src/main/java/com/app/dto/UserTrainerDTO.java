package com.app.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserTrainerDTO {
	@JsonProperty(access = Access.READ_ONLY) //used during serialization
	private Long id;
	@NotNull
	private Long trainer_id;
	@NotNull
	private Long user_id;

	
}

