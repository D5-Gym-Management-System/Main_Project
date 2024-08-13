package com.app.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_trainer_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TrainerUserDetails {
	@EmbeddedId // composite PK
	private TrainerUserId memberId = new TrainerUserId(); // Example of strong association: composition
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("trainerId") // Shared PK approach
	@JoinColumn(name = "trainer_id")
	private Trainer trainer;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userId") // Shared PK approach
	@JoinColumn(name = "UserId")
	private Users user;

	public TrainerUserDetails(TrainerUserId memberId) {
		super();
		this.memberId = memberId;
	}
	
}
