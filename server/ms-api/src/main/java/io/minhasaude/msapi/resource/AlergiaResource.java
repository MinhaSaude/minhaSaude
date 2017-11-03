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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.event.listener.RecursoCriadoEvent;
import io.minhasaude.msapi.model.Alergia;
import io.minhasaude.msapi.repository.AlergiaRepository;
import io.minhasaude.msapi.service.AlergiaService;

@RestController
@RequestMapping("/alergias")
public class AlergiaResource {

	@Autowired
	private AlergiaRepository alergiaRepository;

	@Autowired
	private AlergiaService alergiaService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<List<Alergia>> buscarAlergiasPeloUid(@PathVariable String uid) {

		try {

			List<Alergia> alergias = alergiaService.getAllAlergiasByUid(uid);
			return alergias != null ? ResponseEntity.ok(alergias) : ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@GetMapping("/{uid}/{codigoAlergia}")
	public ResponseEntity<Alergia> buscarAlergiaPeloUidCodigo(@PathVariable String uid,
			@PathVariable Long codigoAlergia) {

		try {

			Alergia alergia = null;

			List<Alergia> alergias = alergiaService.getAllAlergiasByUid(uid);

			if (alergias != null) {
				for (Alergia a : alergias) {
					if (a.getCodigo() == codigoAlergia) {
						alergia = new Alergia();
						alergia = a;
					}
				}
			}

			return alergia != null ? ResponseEntity.ok(alergia) : ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Alergia> criar(@Valid @RequestBody Alergia alergia, HttpServletResponse response) {

		Alergia alergiaSalva = alergiaRepository.save(alergia);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, alergiaSalva.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(alergiaSalva);

	}

	@CrossOrigin
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		alergiaRepository.delete(codigo);
	}
}
