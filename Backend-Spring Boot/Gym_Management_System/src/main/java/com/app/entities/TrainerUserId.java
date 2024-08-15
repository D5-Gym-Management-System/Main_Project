package com.app.entities;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable //=> To Tell JPA , follwoing class DOES NOT have a separate existence
//Instead the contents are going to embedded within the owning entity
@Getter
@Setter
public class TrainerUserId implements Serializable {

    @Column(name = "trainer_id")
    private Long trainerId;

    @Column(name = "user_id")
    private Long userId;

    // Default constructor
    public TrainerUserId() {}

    // Parameterized constructor
    public TrainerUserId(Long trainerId, Long userId) {
        this.trainerId = trainerId;
        this.userId = userId;
    }

    // Getters and Setters
    // ...

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrainerUserId that = (TrainerUserId) o;
        return Objects.equals(trainerId, that.trainerId) &&
               Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trainerId, userId);
    }
}
