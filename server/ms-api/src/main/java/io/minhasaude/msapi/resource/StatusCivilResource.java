package io.minhasaude.msapi.resource;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.StatusCivil;

@RestController
@RequestMapping("/status_civil")
@CrossOrigin
public class StatusCivilResource {

	@GetMapping
	public StatusCivil[] listar() {
		return StatusCivil.values();
	}

}
