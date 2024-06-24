package com.example.enviodetareasservice.modal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TareaDto {

    private String id;

    private String descripcion;

    private String imagen;

    private Long asignarUserId;

    private List<String> tags=new ArrayList<>();

    private EstadoTarea estado;

    private LocalDateTime fechaLimite;

    private LocalDateTime creadoen;



}
