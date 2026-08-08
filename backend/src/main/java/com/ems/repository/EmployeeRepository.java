package com.ems.repository;

import com.ems.model.Employee;
import com.ems.model.EmployeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    Optional<Employee> findByEmailIgnoreCase(String email);

    long countByStatus(EmployeeStatus status);

    long countByDepartmentId(Long departmentId);

    @Query("SELECT AVG(e.salary) FROM Employee e WHERE e.status = 'ACTIVE' AND e.salary IS NOT NULL")
    Optional<BigDecimal> findAverageSalaryOfActiveEmployees();

    @Query("SELECT e FROM Employee e LEFT JOIN FETCH e.department " +
           "WHERE (:query IS NULL OR :query = '' OR " +
           "       LOWER(e.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "       LOWER(e.lastName)  LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "       LOWER(e.email)     LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "       LOWER(e.jobTitle)  LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "AND   (:departmentId IS NULL OR e.department.id = :departmentId) " +
           "AND   (:status IS NULL OR e.status = :status)")
    Page<Employee> searchEmployees(
            @Param("query") String query,
            @Param("departmentId") Long departmentId,
            @Param("status") EmployeeStatus status,
            Pageable pageable
    );

    @Query("SELECT d.name, COUNT(e) FROM Employee e JOIN e.department d GROUP BY d.name ORDER BY COUNT(e) DESC")
    List<Object[]> countEmployeesByDepartment();

    @Query("SELECT e FROM Employee e LEFT JOIN FETCH e.department ORDER BY e.createdAt DESC")
    List<Employee> findTop5ByOrderByCreatedAtDesc(Pageable pageable);
}
