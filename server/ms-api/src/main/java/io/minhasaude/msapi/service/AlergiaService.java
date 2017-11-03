package io.minhasaude.msapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Alergia;
import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.repository.AlergiaRepository;

@Service
public class AlergiaService {

	@Autowired
	private PacienteService pacienteService;

	@Autowired
	private AlergiaRepository alergiaRepository;

	public List<Alergia> getAllAlergiasByUid(String uid) {

		Paciente pacienteSalvo = pacienteService.getPacienteByUid(uid);

		List<Alergia> cirurgias = alergiaRepository.findByPaciente(pacienteSalvo);

		return cirurgias;
	}
}
