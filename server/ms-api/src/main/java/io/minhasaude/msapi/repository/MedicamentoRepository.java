package io.minhasaude.msapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Medicamento;
import io.minhasaude.msapi.model.Paciente;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

	List<Medicamento> findByPaciente(Paciente paciente);

}
