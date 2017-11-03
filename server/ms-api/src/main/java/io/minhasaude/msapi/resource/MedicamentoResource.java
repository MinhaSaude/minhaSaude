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
import io.minhasaude.msapi.model.Medicamento;
import io.minhasaude.msapi.repository.MedicamentoRepository;
import io.minhasaude.msapi.service.MedicamentoService;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoResource {

	@Autowired
	private MedicamentoRepository medicamentoRepository;

	@Autowired
	private MedicamentoService medicamentoService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@CrossOrigin
	@GetMapping("/{uid}")
	public ResponseEntity<List<Medicamento>> buscarMedicamentosPeloUid(@PathVariable String uid) {

		try {

			List<Medicamento> medicamentos = medicamentoService.getAllMedicamentoByUid(uid);
			return medicamentos != null ? ResponseEntity.ok(medicamentos) : ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@GetMapping("/{uid}/{codigoMedicamento}")
	public ResponseEntity<Medicamento> buscarMedicamentoPeloUidCodigo(@PathVariable String uid,
			@PathVariable Long codigoMedicamento) {

		try {

			Medicamento medicamento = null;

			List<Medicamento> medicamentos = medicamentoService.getAllMedicamentoByUid(uid);

			if (medicamentos != null) {
				for (Medicamento m : medicamentos) {
					if (m.getCodigo() == codigoMedicamento) {
						medicamento = new Medicamento();
						medicamento = m;
					}
				}
			}

			return medicamento != null ? ResponseEntity.ok(medicamento) : ResponseEntity.notFound().build();

		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Medicamento> criar(@Valid @RequestBody Medicamento medicamento,
			HttpServletResponse response) {

		Medicamento medicamenoSalvo = medicamentoRepository.save(medicamento);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, medicamenoSalvo.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(medicamenoSalvo);

	}

	@CrossOrigin
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long codigo) {
		medicamentoRepository.delete(codigo);
	}
}
