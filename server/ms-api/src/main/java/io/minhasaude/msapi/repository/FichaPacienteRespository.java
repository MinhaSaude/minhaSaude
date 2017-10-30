package io.minhasaude.msapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.fichaPaciente;

public interface FichaPacienteRespository extends JpaRepository<fichaPaciente, Long>{
	

}
