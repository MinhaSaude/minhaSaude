package io.minhasaude.msapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Pessoa;
import io.minhasaude.msapi.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;

	public Pessoa getPessoaByUid(String uid) {

		Pessoa pessoaSalva = pessoaRepository.findByUid(uid);
		if (pessoaSalva == null) {
			throw new IllegalArgumentException();
		}
		return pessoaSalva;
	}
}
