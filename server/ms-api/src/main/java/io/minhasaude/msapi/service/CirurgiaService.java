package io.minhasaude.msapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Cirurgia;
import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.repository.CirurgiaRepository;

@Service
public class CirurgiaService {

	@Autowired
	private PacienteService pacienteService;

	@Autowired
	private CirurgiaRepository cirurgiaRepository;

	public List<Cirurgia> getAllCirurgiaByUid(String uid) {

		Paciente pacienteSalvo = pacienteService.getPacienteByUid(uid);
		
		List<Cirurgia> cirurgias = cirurgiaRepository.findByPaciente(pacienteSalvo);

		return cirurgias;
	}

}
