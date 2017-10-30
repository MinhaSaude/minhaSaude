package io.minhasaude.msapi.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.event.listener.RecursoCriadoEvent;
import io.minhasaude.msapi.model.Paciente;
import io.minhasaude.msapi.repository.PacienteRepository;
import io.minhasaude.msapi.repository.PessoaRepository;
import io.minhasaude.msapi.service.PacienteService;

@RestController
@RequestMapping("/pacientes")
public class PacienteResource {

	@Autowired
	private PacienteRepository pacienteRepository;

	@Autowired
	private PessoaRepository PessoaRepository;

	@Autowired
	private PacienteService pacienteService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@CrossOrigin
	@GetMapping
	public List<Paciente> listar() {
		return pacienteRepository.findAll();
	}

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<Paciente> buscarPeloUid(@PathVariable String uid) {
		Paciente paciente = pacienteRepository.findByUid(uid);
		return paciente != null ? ResponseEntity.ok(paciente) : ResponseEntity.notFound().build();
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Paciente> criar(@Valid @RequestBody Paciente paciente, HttpServletResponse response) {

		Paciente pacienteSalvo = pacienteRepository.save(paciente);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, pacienteSalvo.getUid()));
		return ResponseEntity.status(HttpStatus.CREATED).body(pacienteSalvo);

	}

	@CrossOrigin
	@PutMapping("/{uid}")
	public ResponseEntity<Paciente> atualizar(@PathVariable String uid, @Valid @RequestBody Paciente paciente) {
		try {
			Paciente pacienteSalvo = pacienteService.atualizar(uid, paciente);
			return ResponseEntity.ok(pacienteSalvo);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@DeleteMapping("/{uid}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable String uid) {
		PessoaRepository.delete(pacienteService.getPacienteByUid(uid).getCodigo());
	}

}
