package com.qualtop.employees.service;

import com.qualtop.employees.entity.Employee;

import java.util.List;

public interface EmployeesService {
    List<Employee> listAllEmployees();

    Employee getEmployee(String id);

    Employee createEmployee(Employee employee);

    Employee updateEmployee(Employee employee);

    Employee deleteEmployee(String id);
}
