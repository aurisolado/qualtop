package com.qualtop.employees.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import javax.validation.constraints.NotEmpty;

@Document(collection = "empleados")
@Data
@AllArgsConstructor @NoArgsConstructor @Builder
public class Employee {


    @Id
    private Long id;

    @NotEmpty(message = "El nombre no debe ser vacío")
    private String nombre;
    @NotEmpty(message = "El sueldo no debe ser vacío")
    private Double sueldo;
    @NotEmpty(message = "La empresa no debe ser vacío")
    private String empresa;


}
