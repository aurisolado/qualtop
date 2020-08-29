package com.qualtop.employees.service;

import com.qualtop.employees.entity.Employee;

import com.qualtop.employees.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeesServiceImpl implements EmployeesService{

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> listAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees;
    }

    @Override
    public Employee getEmployee(String id) {
        Optional<Employee> employees = employeeRepository.findById( id );
        return employees.get();
    }

    @Override
    public Employee createEmployee(Employee employee) {
        employee = employeeRepository.save( employee );
        return employee;
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        log.info("Actualizar empleado " + employee.getId());
        Optional<Employee> s = this.employeeRepository.findById(employee.getId());

        if( !s.isPresent() ) {
            throw new Error("El empleado no existe");
        }else{
            BeanUtils.copyProperties( employee, s.get() );
            employeeRepository.save( s.get() );
        }

        return s.get();
    }

    @Override
    public Employee deleteEmployee(String id) {
        Optional<Employee> s = this.employeeRepository.findById(id);

        if( !s.isPresent() ) {
            throw new Error("El empleado no existe");
        }else{
            employeeRepository.delete( s.get() );
        }

        return s.get();
    }
}
