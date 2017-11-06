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
import io.minhasaude.msapi.model.PacienteDoencasComuns;
import io.minhasaude.msapi.repository.PacienteDoencasComunsRepository;
import io.minhasaude.msapi.service.DoencaComumService;

@RestController
@RequestMapping("/paciente_doencas")
public class PacienteDoencasComunsResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private DoencaComumService doencaComumService;

	@Autowired
	private PacienteDoencasComunsRepository PacienteDoencasComunsRepository;

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<List<PacienteDoencasComuns>> buscarDoencasComumsPeloUid(@PathVariable String uid) {

		try {

			List<PacienteDoencasComuns> pacienteDoencasComuns = doencaComumService.getDoencassByUid(uid);
			return pacienteDoencasComuns != null ? ResponseEntity.ok(pacienteDoencasComuns)
					: ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<PacienteDoencasComuns> criar(@Valid @RequestBody PacienteDoencasComuns pacienteDoencaComun,
			HttpServletResponse response) {

		PacienteDoencasComuns pacienteDoencaComumSalva = PacienteDoencasComunsRepository.save(pacienteDoencaComun);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, pacienteDoencaComumSalva.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(pacienteDoencaComumSalva);

	}

	@CrossOrigin
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		PacienteDoencasComunsRepository.delete(codigo);
	}
}
