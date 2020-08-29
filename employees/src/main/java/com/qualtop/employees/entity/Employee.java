package com.qualtop.employees.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import javax.validation.constraints.NotEmpty;

@Document("empleados")
@Data
@AllArgsConstructor @NoArgsConstructor @Builder
public class Employee {


    @Id
    private String id;

    @NotEmpty(message = "El nombre no debe ser vacío")
    private String nombre;
    private Double sueldo;
    @NotEmpty(message = "La empresa no debe ser vacío")
    private String empresa;


}
