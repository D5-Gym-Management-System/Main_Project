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

    @EmbeddedId
    private TrainerUserId memberId = new TrainerUserId(); // Composite primary key
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("trainerId") // Refers to the field name in TrainerUserId
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId") // Refers to the field name in TrainerUserId
    @JoinColumn(name = "user_id")
    private Users user;
    
    // Optional constructor
    public TrainerUserDetails(Trainer trainer, Users user) {
        this.trainer = trainer;
        this.user = user;
        this.memberId = new TrainerUserId(trainer.getId(), user.getId());
    }
}
