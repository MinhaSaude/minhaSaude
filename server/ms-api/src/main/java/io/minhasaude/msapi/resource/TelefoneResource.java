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
import io.minhasaude.msapi.model.Telefone;
import io.minhasaude.msapi.repository.TelefoneRepository;
import io.minhasaude.msapi.service.PessoaService;

@RestController
@RequestMapping("/telefones")
public class TelefoneResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private TelefoneRepository telefoneRepository;
	
	@Autowired
	private PessoaService pessoaService;

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<Telefone> buscarTelPeloUid(@PathVariable String uid) {
		try {
		
		Telefone telefone = pessoaService.getPessoaByUid(uid).getTelefone();
		return telefone != null ? ResponseEntity.ok(telefoneRepository.findOne(telefone.getCodigo())) : ResponseEntity.notFound().build();
		
		}catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Telefone> criar(@Valid @RequestBody Telefone telefone, HttpServletResponse response) {
		Telefone telefoneSalvo = telefoneRepository.save(telefone);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, telefoneSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(telefoneSalvo);
	}

}
