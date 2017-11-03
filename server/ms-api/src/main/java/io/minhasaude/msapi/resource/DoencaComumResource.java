package io.minhasaude.msapi.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.minhasaude.msapi.model.DoencaComum;
import io.minhasaude.msapi.repository.DoencaComumRepository;

@RestController
@RequestMapping("doencas_comuns")
public class DoencaComumResource {

	@Autowired
	private DoencaComumRepository doencaComoumRepository;

	@GetMapping
	public List<DoencaComum> listar() {
		return doencaComoumRepository.findAll();
	}
}
