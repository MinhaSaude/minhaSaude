package io.minhasaude.msapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.model.PacienteDoencasComuns;

public interface PacienteDoencasComunsRepository extends JpaRepository<PacienteDoencasComuns, Long>{
	
	List<PacienteDoencasComuns> findByPaciente(Paciente paciente);

}
