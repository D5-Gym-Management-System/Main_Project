package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BaseEntity{
	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private Role role;
	
	@Column(length = 30)
	private String name;
	
	@Column(length = 500)
	private String message;
	
}
