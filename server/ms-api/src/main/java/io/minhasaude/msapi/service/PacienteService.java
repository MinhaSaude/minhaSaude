package io.minhasaude.msapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Endereco;
import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.model.Telefone;
import io.minhasaude.msapi.repository.EnderecoRepository;
import io.minhasaude.msapi.repository.PacienteRepository;
import io.minhasaude.msapi.repository.PessoaRepository;
import io.minhasaude.msapi.repository.TelefoneRepository;
import io.minhasaude.msapi.service.exception.EnderecoInexistenteException;
import io.minhasaude.msapi.service.exception.TelefoneInexistenteException;

@Service
public class PacienteService {

	@Autowired
	private PacienteRepository pacienteRepository;
	
	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private TelefoneRepository telefoneRepository;

	@Autowired
	private EnderecoRepository enderecoRepository;

	public Paciente salvar(Paciente paciente) {

		validarTelefone(paciente);

		validarEndereco(paciente);

		return pacienteRepository.save(paciente);
	}

	public Paciente atualizar(Long codigo, Paciente paciente) {

		Paciente pacienteSalvo = buscarPacienteExistente(codigo);

		if (!paciente.getTelefone().equals(pacienteSalvo.getTelefone())) {
			validarTelefone(paciente);
		}

		if (!paciente.getEndereco().equals(pacienteSalvo.getEndereco())) {
			validarEndereco(paciente);
		}

		BeanUtils.copyProperties(paciente, pacienteSalvo, "codigo");

		return pacienteRepository.save(pacienteSalvo);
	}

	private void validarTelefone(Paciente paciente) {

		Telefone telefone = null;

		if (paciente.getTelefone().getCodigo() != null) {
			telefone = telefoneRepository.findOne(paciente.getTelefone().getCodigo());
		}

		if (telefone == null) {
			throw new TelefoneInexistenteException();
		}

	}

	private void validarEndereco(Paciente paciente) {

		Endereco endereco = null;

		if (paciente.getEndereco().getCodigo() != null) {
			endereco = enderecoRepository.findOne(paciente.getEndereco().getCodigo());
		}

		if (endereco == null) {
			throw new EnderecoInexistenteException();
		}
	}

	private Paciente buscarPacienteExistente(Long codigo) {
		Paciente pacienteSalvo = pacienteRepository.findOne(codigo);
		if (pacienteSalvo == null) {
			throw new IllegalArgumentException();
		}
		return pacienteSalvo;
	}

}
