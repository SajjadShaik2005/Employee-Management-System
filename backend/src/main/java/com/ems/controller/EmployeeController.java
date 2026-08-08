package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import com.ems.dto.StatsDTO;
import com.ems.model.EmployeeStatus;
import com.ems.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EmployeeDTO>>> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return ResponseEntity.ok(ApiResponse.success(
                employeeService.getAllEmployees(page, size, sortBy, sortDir)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(employeeService.getEmployeeById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeDTO>> createEmployee(
            @Valid @RequestBody EmployeeDTO dto) {
        EmployeeDTO created = employeeService.createEmployee(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Employee created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(
                employeeService.updateEmployee(id, dto), "Employee updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Employee deleted successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PagedResponse<EmployeeDTO>>> searchEmployees(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) EmployeeStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(
                employeeService.searchEmployees(q, departmentId, status, page, size)));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<StatsDTO>> getDashboardStats() {
        return ResponseEntity.ok(ApiResponse.success(employeeService.getDashboardStats()));
    }
}
