package com.ems.dto;

import com.ems.model.EmployeeStatus;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDTO {

    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number")
    private String phone;

    @Size(max = 100, message = "Job title must not exceed 100 characters")
    private String jobTitle;

    @DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than 0")
    private BigDecimal salary;

    @PastOrPresent(message = "Hire date must be today or in the past")
    private LocalDate hireDate;

    private EmployeeStatus status;

    private Long departmentId;
    private String departmentName;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
