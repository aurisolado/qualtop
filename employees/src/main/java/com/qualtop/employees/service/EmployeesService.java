package com.qualtop.employees.service;

import com.qualtop.employees.entity.Employee;

import java.util.List;

public interface EmployeesService {
    List<Employee> listAllEmployees();

    Employee getEmployee(Long id);

    Employee createEmployee(Employee product);

    Employee updateEmployee(Employee employee);

    Employee deleteEmployee(Long id);
}
