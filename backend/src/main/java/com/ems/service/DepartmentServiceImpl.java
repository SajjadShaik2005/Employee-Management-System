package com.ems.service;

import com.ems.dto.DepartmentDTO;
import com.ems.exception.ResourceNotFoundException;
import com.ems.model.Department;
import com.ems.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAllWithEmployees()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentDTO getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        return toDTO(dept);
    }

    @Override
    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        if (departmentRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new IllegalArgumentException("Department with name '" + dto.getName() + "' already exists");
        }
        Department dept = Department.builder()
                .name(dto.getName().trim())
                .description(dto.getDescription())
                .build();
        return toDTO(departmentRepository.save(dept));
    }

    @Override
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));

        if (departmentRepository.existsByNameIgnoreCaseAndIdNot(dto.getName(), id)) {
            throw new IllegalArgumentException("Department with name '" + dto.getName() + "' already exists");
        }

        dept.setName(dto.getName().trim());
        dept.setDescription(dto.getDescription());
        return toDTO(departmentRepository.save(dept));
    }

    @Override
    public void deleteDepartment(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        if (!dept.getEmployees().isEmpty()) {
            throw new IllegalStateException(
                    "Cannot delete department '" + dept.getName() + "' — it still has " +
                    dept.getEmployees().size() + " employee(s). Reassign them first.");
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO toDTO(Department dept) {
        return DepartmentDTO.builder()
                .id(dept.getId())
                .name(dept.getName())
                .description(dept.getDescription())
                .employeeCount(dept.getEmployeeCount())
                .createdAt(dept.getCreatedAt())
                .updatedAt(dept.getUpdatedAt())
                .build();
    }
}
