package io.minhasaude.msapi.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.TipoCirurgia;
import io.minhasaude.msapi.repository.TipoCirurgiaRepository;

@RestController
@RequestMapping("/tiposCirurgia")
public class TipoCirurgiaResource {

	@Autowired
	private TipoCirurgiaRepository tipoCirurgiaRespository;

	@CrossOrigin
	@GetMapping
	public List<TipoCirurgia> listar() {
		return tipoCirurgiaRespository.findAll();
	}

}
