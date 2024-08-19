package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Admin extends BaseEntity {

    @Column(length = 30, nullable = false)
    private String name;


    @Column(length = 30, unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private int age;
    
    private Long mobileno;
    
    

    
}

