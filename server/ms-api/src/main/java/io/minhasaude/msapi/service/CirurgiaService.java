package io.minhasaude.msapi.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.minhasaude.msapi.model.Cirurgia;
import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.model.TipoCirurgia;
import io.minhasaude.msapi.model.fichaPaciente;
import io.minhasaude.msapi.repository.CirurgiaRepository;
import io.minhasaude.msapi.repository.PacienteRepository;
import io.minhasaude.msapi.repository.TipoCirurgiaRepository;
import io.minhasaude.msapi.service.exception.TelefoneInexistenteException;

@Service
public class CirurgiaService {

	@Autowired
	private PacienteRepository pacienteRepository;

	@Autowired
	private CirurgiaRepository cirurgiaRepository;

	@Autowired
	private TipoCirurgiaRepository tipoCirurgiaRepository;

	public List<Cirurgia> getAllCirurgiaByUid(String uid) {

		Paciente pacienteSalvo = pacienteRepository.findByUid(uid);

		if (pacienteSalvo == null) {
			throw new IllegalArgumentException();
		}

		fichaPaciente ficha = new fichaPaciente();
		ficha.setCodigo(pacienteSalvo.getCodigo());

		List<Cirurgia> cirurgias = cirurgiaRepository.findByFichaPaciente(ficha);

		return cirurgias;
	}

	public Cirurgia atualizar(Long codigo, Cirurgia cirurgia) {

		Cirurgia cirurgiaSalva = cirurgiaRepository.getOne(codigo);

		if (!cirurgia.getTipoCirurgia().equals(cirurgiaSalva.getTipoCirurgia())) {
			validarTipoCirurgia(cirurgia);
		}

		BeanUtils.copyProperties(cirurgia, cirurgiaSalva, "codigo");

		return cirurgiaRepository.save(cirurgiaSalva);
	}

	private void validarTipoCirurgia(Cirurgia cirurgia) {

		TipoCirurgia tipoCirurgia = null;

		if (cirurgia.getTipoCirurgia().getCodigo() != null) {
			tipoCirurgia = tipoCirurgiaRepository.findOne(cirurgia.getTipoCirurgia().getCodigo());
		}

		if (tipoCirurgia == null) {
			throw new TelefoneInexistenteException();
		}

	}

}
