package io.minhasaude.msapi.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.TipoSanguineo;

@RestController
@RequestMapping("/tipos_sanguineos")
public class TipoSanguineoResource {
	

	@GetMapping
	public TipoSanguineo[] listar() {
		return TipoSanguineo.values();
	}

}
