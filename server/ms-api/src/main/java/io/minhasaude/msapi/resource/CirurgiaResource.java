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
import io.minhasaude.msapi.model.Cirurgia;
import io.minhasaude.msapi.repository.CirurgiaRepository;
import io.minhasaude.msapi.service.CirurgiaService;

@RestController
@RequestMapping("/cirurgias")
public class CirurgiaResource {

	@Autowired
	private CirurgiaRepository cirurgiaRepository;

	@Autowired
	private CirurgiaService cirurgiaService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<List<Cirurgia>> buscarCirurgiasPeloUid(@PathVariable String uid) {

		try {

			List<Cirurgia> cirurgias = cirurgiaService.getAllCirurgiaByUid(uid);
			return cirurgias != null ? ResponseEntity.ok(cirurgias) : ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@GetMapping("/{uid}/{codigoCirurgia}")
	public ResponseEntity<Cirurgia> buscarCirurgiaPeloUid(@PathVariable String uid, @PathVariable Long codigoCirurgia) {

		try {

			Cirurgia cirurgia = null;

			List<Cirurgia> cirurgias = cirurgiaService.getAllCirurgiaByUid(uid);

			if (cirurgias != null) {
				for (Cirurgia c : cirurgias) {
					if (c.getCodigo() == codigoCirurgia) {
						cirurgia = new Cirurgia();
						cirurgia = c;
					}
				}
			}

			return cirurgia != null ? ResponseEntity.ok(cirurgia) : ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Cirurgia> criar(@Valid @RequestBody Cirurgia cirurgia, HttpServletResponse response) {

		Cirurgia cirurgiaSalva = cirurgiaRepository.save(cirurgia);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, cirurgiaSalva.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(cirurgiaSalva);

	}

	@CrossOrigin
	@PutMapping("/{codigo}")
	public ResponseEntity<Cirurgia> atualizar(@PathVariable Long codigo, @Valid @RequestBody Cirurgia cirurgia) {
		try {
			Cirurgia cirurgiaSalva = cirurgiaService.atualizar(codigo, cirurgia);
			return ResponseEntity.ok(cirurgiaSalva);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		cirurgiaRepository.delete(codigo);
	}

}
