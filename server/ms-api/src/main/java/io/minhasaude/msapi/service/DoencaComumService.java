package io.minhasaude.msapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.model.PacienteDoencasComuns;
import io.minhasaude.msapi.repository.PacienteDoencasComunsRepository;

@Service
public class DoencaComumService {

	@Autowired
	private PacienteService pacienteService;

	@Autowired
	private PacienteDoencasComunsRepository pacienteDoencasComunsRepository;

	public List<PacienteDoencasComuns> getDoencassByUid(String uid) {

		Paciente pacienteSalvo = pacienteService.getPacienteByUid(uid);

		List<PacienteDoencasComuns> pacienteDoencasComuns = pacienteDoencasComunsRepository.findByPaciente(pacienteSalvo);

		return pacienteDoencasComuns;
	}

}
