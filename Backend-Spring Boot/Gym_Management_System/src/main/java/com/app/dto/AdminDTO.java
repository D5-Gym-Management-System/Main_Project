package com.app.dto;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
public class AdminDTO {
	@JsonProperty(access = Access.READ_ONLY) //used during serialization
	private Long id;

    @NotBlank(message = "name is required")
    @Size(max = 30, message = "name cannot be longer than 30 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 2, message = "Password should be at least 2 characters long")
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;
    
    @NotBlank(message = "Confirm_Password is required")
    @Size(min = 2, message = "Password should be at least 2 characters long")
    @JsonProperty(access = Access.WRrnITE_ONLY)
	private String confirmPassword;

    private int age;
    
    
   private Long mobileno;
}

