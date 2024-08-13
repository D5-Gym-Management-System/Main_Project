package com.app.entities;

//import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

//import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="membership_info")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Membership extends BaseEntity {
	@Column(unique = true)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private MembershipStatus status;
	private double cost;
	
	public Membership(String name,Membership status,double cost) {
		super();
		this.name = name;
		this.cost=cost;
		this.status=MembershipStatus.UPCOMING;
	}
	public Membership(String name) {
		super();
		this.name = name;
	}
}
