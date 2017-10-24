package io.minhasaude.msapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Endereco;
import io.minhasaude.msapi.repository.EnderecoRepository;

@Service
public class EnderecoService {

	@Autowired
	private EnderecoRepository enderecoRepository;

	public Endereco atualizar(Long codigo, Endereco endereco) {
		Endereco enderecoSalvo = enderecoRepository.findOne(codigo);

		if (enderecoSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}

		BeanUtils.copyProperties(endereco, enderecoSalvo, "codigo");
		return enderecoRepository.save(enderecoSalvo);
	}

}
