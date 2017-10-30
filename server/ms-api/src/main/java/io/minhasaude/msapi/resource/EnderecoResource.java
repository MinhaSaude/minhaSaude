package io.minhasaude.msapi.resource;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.event.listener.RecursoCriadoEvent;
import io.minhasaude.msapi.model.Endereco;
import io.minhasaude.msapi.repository.EnderecoRepository;
import io.minhasaude.msapi.service.PessoaService;

@RestController
@RequestMapping("/enderecos")
public class EnderecoResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private EnderecoRepository enderecoRepository;

	@Autowired
	private PessoaService pessoaService;

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<Endereco> buscarEndPeloUid(@PathVariable String uid) {
		try {

			Endereco endereco = pessoaService.getPessoaByUid(uid).getEndereco();
			return endereco != null ? ResponseEntity.ok(enderecoRepository.findOne(endereco.getCodigo()))
					: ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Endereco> criar(@Valid @RequestBody Endereco endereco, HttpServletResponse response) {
		Endereco enderecoSalvo = enderecoRepository.save(endereco);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, enderecoSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(enderecoSalvo);
	}

}
