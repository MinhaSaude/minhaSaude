package io.minhasaude.msapi.resource;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.GrauEscolaridade;

@RestController
@RequestMapping("/graus_escolaridade")
@CrossOrigin
public class GrauEscolaridadeResource {

	@GetMapping
	public GrauEscolaridade[] listar() {
		return GrauEscolaridade.values();
	}
}
