package com.app.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserTrainer {
	@NotNull
	private Long Userid;
	@NotNull
	private Long Trainerid;
	private double performanceIndex;
}
