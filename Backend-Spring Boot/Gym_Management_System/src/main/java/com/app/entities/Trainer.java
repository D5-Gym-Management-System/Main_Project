package com.app.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import org.apache.catalina.User;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "trainer")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString(exclude = "users",callSuper = true)
public class Trainer extends BaseEntity {
	
	@Column(length = 30)
	private String name;
	@Column(length = 30, unique = true) // =>unique
	private String email;
	@Column(nullable = false) // =>NOT NULL
	private String password;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate joinDate;
	@DateTimeFormat(pattern = "HH:mm")
	private LocalTime inTime;
	@DateTimeFormat(pattern = "HH:mm")
	private LocalTime outTime;
	@Enumerated(EnumType.STRING) // col : varchar => enum constant name
	@Column(length = 30)
	private TrainerType trainerType;
//	@Lob // large object :col : longblob
//	private byte[] image;
	private String imagePath;
	private double salary;
	@Min(0)
	int age;
	
	// one to many
	@OneToMany(mappedBy = "trainer", cascade = CascadeType.PERSIST /* , orphanRemoval = true */)
	private List<Users> users = new ArrayList<>();
	

	// as per Gavin King's IMPORTANT suggestion add helper methods to add/remove
	// child
	public void addUser(Users e) {
		users.add(e);// dept --> emp
		e.setTrainer(this);// emp --> dept
	}
	public void removeUser(Users e) {
		users.remove(e);
		e.setTrainer(null);
	}
	
	

}
