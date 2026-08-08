package com.ems.service;

import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import com.ems.dto.StatsDTO;
import com.ems.model.EmployeeStatus;

public interface EmployeeService {
    PagedResponse<EmployeeDTO> getAllEmployees(int page, int size, String sortBy, String sortDir);
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO createEmployee(EmployeeDTO dto);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO dto);
    void deleteEmployee(Long id);
    PagedResponse<EmployeeDTO> searchEmployees(String query, Long departmentId, EmployeeStatus status, int page, int size);
    StatsDTO getDashboardStats();
}
