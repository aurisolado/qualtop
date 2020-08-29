package com.qualtop.employees;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class EmployeesServiceApplication {

	public static void main(String[] args) {
		System.out.println("init employees service");

		SpringApplication.run(EmployeesServiceApplication.class, args);
	}

}
