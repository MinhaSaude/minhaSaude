package io.minhasaude.msapi.event.listener;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEvent;

public class RecursoCriadoEvent extends ApplicationEvent {

	private static final long serialVersionUID = 1L;
	
	private HttpServletResponse response;
	private Object codigo;

	public RecursoCriadoEvent(Object source, HttpServletResponse response, Object codigo) {
		super(source);
		this.response = response;
		this.codigo = codigo;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public Object getCodigo() {
		return codigo;
	}
}