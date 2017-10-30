package io.minhasaude.msapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	Pessoa findByUid(String uid);
}
