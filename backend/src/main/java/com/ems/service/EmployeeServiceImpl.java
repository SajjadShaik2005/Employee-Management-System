package com.ems.service;

import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import com.ems.dto.StatsDTO;
import com.ems.exception.ResourceNotFoundException;
import com.ems.model.Department;
import com.ems.model.Employee;
import com.ems.model.EmployeeStatus;
import com.ems.repository.DepartmentRepository;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeDTO> getAllEmployees(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Employee> employeePage = employeeRepository.searchEmployees(null, null, null, pageable);
        return toPagedResponse(employeePage);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(Long id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return toDTO(emp);
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        if (employeeRepository.existsByEmailIgnoreCase(dto.getEmail())) {
            throw new IllegalArgumentException("Employee with email '" + dto.getEmail() + "' already exists");
        }

        Department dept = null;
        if (dto.getDepartmentId() != null) {
            dept = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + dto.getDepartmentId()));
        }

        Employee emp = Employee.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail().toLowerCase())
                .phone(dto.getPhone())
                .jobTitle(dto.getJobTitle())
                .salary(dto.getSalary())
                .hireDate(dto.getHireDate())
                .status(dto.getStatus() != null ? dto.getStatus() : EmployeeStatus.ACTIVE)
                .department(dept)
                .build();

        return toDTO(employeeRepository.save(emp));
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        if (employeeRepository.existsByEmailIgnoreCaseAndIdNot(dto.getEmail(), id)) {
            throw new IllegalArgumentException("Email '" + dto.getEmail() + "' is already in use");
        }

        Department dept = null;
        if (dto.getDepartmentId() != null) {
            dept = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + dto.getDepartmentId()));
        }

        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail().toLowerCase());
        emp.setPhone(dto.getPhone());
        emp.setJobTitle(dto.getJobTitle());
        emp.setSalary(dto.getSalary());
        emp.setHireDate(dto.getHireDate());
        emp.setStatus(dto.getStatus() != null ? dto.getStatus() : emp.getStatus());
        emp.setDepartment(dept);

        return toDTO(employeeRepository.save(emp));
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeDTO> searchEmployees(String query, Long departmentId,
                                                       EmployeeStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        Page<Employee> result = employeeRepository.searchEmployees(query, departmentId, status, pageable);
        return toPagedResponse(result);
    }

    @Override
    @Transactional(readOnly = true)
    public StatsDTO getDashboardStats() {
        long total = employeeRepository.count();
        long active = employeeRepository.countByStatus(EmployeeStatus.ACTIVE);
        long inactive = employeeRepository.countByStatus(EmployeeStatus.INACTIVE);
        long onLeave = employeeRepository.countByStatus(EmployeeStatus.ON_LEAVE);
        long deptCount = departmentRepository.count();

        BigDecimal avgSalary = employeeRepository.findAverageSalaryOfActiveEmployees()
                .orElse(BigDecimal.ZERO);

        List<StatsDTO.DeptCountDTO> deptCounts = employeeRepository.countEmployeesByDepartment()
                .stream()
                .map(row -> StatsDTO.DeptCountDTO.builder()
                        .department((String) row[0])
                        .count(((Number) row[1]).longValue())
                        .build())
                .collect(Collectors.toList());

        Pageable top5 = PageRequest.of(0, 5);
        List<EmployeeDTO> recent = employeeRepository.findTop5ByOrderByCreatedAtDesc(top5)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return StatsDTO.builder()
                .totalEmployees(total)
                .activeEmployees(active)
                .inactiveEmployees(inactive)
                .onLeaveEmployees(onLeave)
                .totalDepartments(deptCount)
                .averageSalary(avgSalary)
                .employeesByDepartment(deptCounts)
                .recentHires(recent)
                .build();
    }

    // ── Mappers ─────────────────────────────────────────────────────────────

    public EmployeeDTO toDTO(Employee emp) {
        return EmployeeDTO.builder()
                .id(emp.getId())
                .firstName(emp.getFirstName())
                .lastName(emp.getLastName())
                .email(emp.getEmail())
                .phone(emp.getPhone())
                .jobTitle(emp.getJobTitle())
                .salary(emp.getSalary())
                .hireDate(emp.getHireDate())
                .status(emp.getStatus())
                .departmentId(emp.getDepartment() != null ? emp.getDepartment().getId() : null)
                .departmentName(emp.getDepartment() != null ? emp.getDepartment().getName() : null)
                .createdAt(emp.getCreatedAt())
                .updatedAt(emp.getUpdatedAt())
                .build();
    }

    private PagedResponse<EmployeeDTO> toPagedResponse(Page<Employee> page) {
        List<EmployeeDTO> content = page.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return PagedResponse.<EmployeeDTO>builder()
                .content(content)
                .pageNo(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
