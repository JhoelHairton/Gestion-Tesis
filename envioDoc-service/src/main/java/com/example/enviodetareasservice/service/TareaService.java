package com.example.enviodetareasservice.service;

import com.example.enviodetareasservice.modal.TareaDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "envio-tareas-service", path = "/api/tareas")
public interface TareaService {

    @GetMapping("/api/tareas/{id}")
    public TareaDto getTareaById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception;

    @PutMapping("/api/tareas/{id}/complete")
    public TareaDto tareaCompletada(
            @PathVariable Long id) throws Exception;

}
