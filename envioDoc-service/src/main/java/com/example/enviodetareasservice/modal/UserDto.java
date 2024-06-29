package com.example.enviodetareasservice.modal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
    private Long id;

    private String password;
    private String email;
    private String rol;
    private String nombre;
}
