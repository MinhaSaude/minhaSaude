package io.minhasaude.msapi.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import io.minhasaude.msapi.model.Telefone;
import io.minhasaude.msapi.service.TelefoneService;
import io.minhasaude.msapi.repository.TelefoneRepository;

@RestController
@RequestMapping("/telefones")
public class TelefoneResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private TelefoneRepository telefoneRepository;

	@Autowired
	private TelefoneService TelefoneService;

	@GetMapping
	public List<Telefone> listar() {
		return telefoneRepository.findAll();
	}

	@GetMapping("/{codigo}")
	public ResponseEntity<Telefone> buscarPeloCodigo(@PathVariable Long codigo) {
		Telefone telefone = telefoneRepository.findOne(codigo);
		return telefone != null ? ResponseEntity.ok(telefone) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<Telefone> criar(@Valid @RequestBody Telefone telefone, HttpServletResponse response) {
		Telefone telefoneSalvo = telefoneRepository.save(telefone);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, telefoneSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(telefoneSalvo);
	}

	@PutMapping("/{codigo}")
	public ResponseEntity<Telefone> atualizar(@PathVariable Long codigo, @Valid @RequestBody Telefone telefone) {
		Telefone telefoneSalvo = TelefoneService.atualizar(codigo, telefone);
		return ResponseEntity.ok(telefoneSalvo);
	}

	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		telefoneRepository.delete(codigo);
	}

}
