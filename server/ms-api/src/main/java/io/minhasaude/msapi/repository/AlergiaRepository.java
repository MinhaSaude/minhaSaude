package io.minhasaude.msapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Alergia;
import io.minhasaude.msapi.model.Paciente;

public interface AlergiaRepository extends JpaRepository<Alergia, Long>{
	
	List<Alergia> findByPaciente(Paciente paciente);

}
