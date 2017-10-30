package io.minhasaude.msapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Pessoa;
import io.minhasaude.msapi.model.Telefone;
import io.minhasaude.msapi.repository.PessoaRepository;
import io.minhasaude.msapi.repository.TelefoneRepository;

@Service
public class TelefoneService {

	@Autowired
	private TelefoneRepository telefoneRepository;

	@Autowired
	private PessoaRepository pessoaRepository;

	public Telefone atualizar(Long codigo, Telefone telefone) {
		Telefone telefoneSalvo = telefoneRepository.findOne(codigo);

		if (telefoneSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}

		BeanUtils.copyProperties(telefone, telefoneSalvo, "codigo");
		return telefoneRepository.save(telefoneSalvo);
	}

	public void deletar(String uid, Long codigoTelefone) {
		
		Telefone telefoneSalvo = telefoneRepository.findOne(codigoTelefone);

		if (telefoneSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		} else 
		{
			Pessoa pessoaSalva = pessoaRepository.findByUid(uid);
			
			System.out.println("=======================" + pessoaSalva.getUid());
			
			pessoaSalva.setTelefone(null);
			
			pessoaRepository.save(pessoaSalva);
		}

	}
}
