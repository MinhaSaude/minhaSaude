package io.minhasaude.msapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Medicamento;
import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.repository.MedicamentoRepository;

@Service
public class MedicamentoService {

	@Autowired
	private PacienteService pacienteService;

	@Autowired
	private MedicamentoRepository medicamentoRepository;

	public List<Medicamento> getAllMedicamentoByUid(String uid) {

		Paciente pacienteSalvo = pacienteService.getPacienteByUid(uid);

		List<Medicamento> medicamentos = medicamentoRepository.findByPaciente(pacienteSalvo);

		return medicamentos;
	}

}
