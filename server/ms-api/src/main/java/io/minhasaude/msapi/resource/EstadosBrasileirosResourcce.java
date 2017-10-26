package io.minhasaude.msapi.resource;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.EstadosBrasileiros;

@RestController
@RequestMapping("/estados_brasileiros")
@CrossOrigin
public class EstadosBrasileirosResourcce {

	@GetMapping
	public EstadosBrasileiros[] listar() {
		return EstadosBrasileiros.values();
	}

}
