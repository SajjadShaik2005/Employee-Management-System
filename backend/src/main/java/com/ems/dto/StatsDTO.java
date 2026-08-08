package com.ems.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatsDTO {

    private long totalEmployees;
    private long activeEmployees;
    private long inactiveEmployees;
    private long onLeaveEmployees;
    private long totalDepartments;
    private BigDecimal averageSalary;

    private List<DeptCountDTO> employeesByDepartment;
    private List<EmployeeDTO> recentHires;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DeptCountDTO {
        private String department;
        private long count;
    }
}
