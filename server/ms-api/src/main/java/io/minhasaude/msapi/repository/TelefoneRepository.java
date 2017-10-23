package io.minhasaude.msapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Telefone;

public interface TelefoneRepository extends JpaRepository<Telefone, Long> {

}
