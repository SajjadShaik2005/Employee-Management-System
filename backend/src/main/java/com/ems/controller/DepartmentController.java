package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.DepartmentDTO;
import com.ems.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DepartmentDTO>>> getAllDepartments() {
        return ResponseEntity.ok(ApiResponse.success(departmentService.getAllDepartments()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentDTO>> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(departmentService.getDepartmentById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DepartmentDTO>> createDepartment(
            @Valid @RequestBody DepartmentDTO dto) {
        DepartmentDTO created = departmentService.createDepartment(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Department created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentDTO>> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(
                departmentService.updateDepartment(id, dto), "Department updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Department deleted successfully"));
    }
}
