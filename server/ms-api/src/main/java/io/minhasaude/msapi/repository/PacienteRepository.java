package io.minhasaude.msapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

	Paciente findByUid(String uid);
}
