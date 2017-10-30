package io.minhasaude.msapi.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.fichaPaciente;
import io.minhasaude.msapi.repository.FichaPacienteRespository;
import io.minhasaude.msapi.service.PacienteService;

@RestController
@RequestMapping("fichas")
public class FichaPacienteResource {

	@Autowired
	private FichaPacienteRespository FichaPacienteRespository;

	@Autowired
	private PacienteService pacienteService;

	@GetMapping
	public List<fichaPaciente> listar() {
		return FichaPacienteRespository.findAll();
	}

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<fichaPaciente> buscarPeloUid(@PathVariable String uid) {

		try {
			fichaPaciente ficha = FichaPacienteRespository.findOne(pacienteService.getPacienteByUid(uid).getCodigo());

			return ficha != null ? ResponseEntity.ok(ficha) : ResponseEntity.notFound().build();
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
