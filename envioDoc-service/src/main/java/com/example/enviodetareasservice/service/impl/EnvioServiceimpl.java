package com.example.enviodetareasservice.service.impl;

import com.example.enviodetareasservice.modal.Envio;
import com.example.enviodetareasservice.modal.TareaDto;
import com.example.enviodetareasservice.repository.EnvioRepository;
import com.example.enviodetareasservice.service.EnvioService;
import com.example.enviodetareasservice.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnvioServiceimpl implements EnvioService {

    @Autowired
    private EnvioRepository envioRepository;

    @Autowired
    private TareaService tareaService;

    @Override
    //"tareaId" es de otro microservicio
    public Envio enviarTarea(Long tareaId, String githubLink, Long userId, String jwt) throws Exception {
        TareaDto tarea =tareaService.getTareaById(tareaId,jwt);
        if (tarea!=null){
            Envio envio=new Envio();
            envio.setTareaId(tareaId);
            envio.setUserId(userId);
            envio.setGithubLink(githubLink);
            envio.setFechaEnvio(LocalDateTime.now());
            return envioRepository.save(envio);
        }
        throw new Exception("Tarea no encontrada con el id : "+tareaId);
    }

    @Override
    public Envio getEnvioTareaById(Long envioId) throws Exception {
        return envioRepository.findById(envioId).orElseThrow(()->
                new Exception("Tarea noencontrada con el id"+envioId));
    }

    @Override
    public List<Envio> getAllEnvioTarea() {
        return envioRepository.findAll();
    }

    @Override
    public List<Envio> getEnvioTareaByTareaId(Long tareasId) {
        return envioRepository.findByTareaId(tareasId);
    }

    @Override
    public Envio aceptarRechazarEnvio(Long id, String estado) throws Exception {
        Envio envio=getEnvioTareaById(id);
        envio.setEstado(estado);
        if (estado.equals("ACEPTADO")){
            tareaService.completeTareas(envio.getTareaId());
        }
        return envioRepository.save(envio);
    }
}
