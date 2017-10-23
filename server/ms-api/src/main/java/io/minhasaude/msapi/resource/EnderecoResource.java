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
import io.minhasaude.msapi.model.Endereco;
import io.minhasaude.msapi.repository.EnderecoRepository;
import io.minhasaude.msapi.service.EnderecoService;

@RestController
@RequestMapping("/enderecos")
public class EnderecoResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private EnderecoRepository enderecoRepository;

	@Autowired
	private EnderecoService enderecoService;

	@GetMapping
	public List<Endereco> listar() {
		return enderecoRepository.findAll();
	}

	@GetMapping("/{codigo}")
	public ResponseEntity<Endereco> buscarPeloCodigo(@PathVariable Long codigo) {
		Endereco endereco = enderecoRepository.findOne(codigo);
		return endereco != null ? ResponseEntity.ok(endereco) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<Endereco> criar(@Valid @RequestBody Endereco endereco, HttpServletResponse response) {
		Endereco enderecoSalvo = enderecoRepository.save(endereco);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, enderecoSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(enderecoSalvo);
	}

	@PutMapping("/{codigo}")
	public ResponseEntity<Endereco> atualizar(@PathVariable Long codigo, @Valid @RequestBody Endereco endereco) {
		Endereco enderecoSalvo = enderecoService.atualizar(codigo, endereco);
		return ResponseEntity.ok(enderecoSalvo);
	}

	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		enderecoRepository.delete(codigo);
	}

}
