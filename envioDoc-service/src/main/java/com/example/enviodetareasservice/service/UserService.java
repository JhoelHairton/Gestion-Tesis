package com.example.enviodetareasservice.service;

import com.example.enviodetareasservice.modal.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE", url = "http://localhost:5001")
public interface UserService {
    @GetMapping("/api/users/perfil")
    public UserDto getUserPerfil(@RequestHeader("Authorization") String jwt);
}
