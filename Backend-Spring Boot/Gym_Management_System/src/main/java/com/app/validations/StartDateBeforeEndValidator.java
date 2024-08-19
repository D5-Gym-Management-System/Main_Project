//package com.app.validations;
//
//import javax.validation.ConstraintValidator;
//import javax.validation.ConstraintValidatorContext;
//
//import com.app.dto.ProjectDTO;
//import com.app.dto.UserDTO;
//
//public class StartDateBeforeEndValidator implements ConstraintValidator<StartDateBeforeEnd, UserDTO> {
//	@Override
//	public boolean isValid(UserDTO dto, ConstraintValidatorContext context) {
//		System.out.println("in custom validation " + dto + " " + context);
//		if (dto.getStartDate() != null && dto.getEndDate() != null)
//			return dto.getStartDate().isBefore(dto.getEndDate());
//		return false;
//	}
//
//}
