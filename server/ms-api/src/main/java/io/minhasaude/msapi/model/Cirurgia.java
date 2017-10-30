package io.minhasaude.msapi.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "cirurgia")
public class Cirurgia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@NotNull
	@Size(min = 3, max = 20)
	private String menbro;

	private LocalDate data;

	@JsonManagedReference
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "codigo_tipo_cirurgia")
	private TipoCirurgia tipoCirurgia;

	@JsonBackReference(value = "paciente")
	@ManyToOne
	@JoinColumn(name = "codigo_ficha")
	private fichaPaciente fichaPaciente;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getMenbro() {
		return menbro;
	}

	public void setMenbro(String menbro) {
		this.menbro = menbro;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public TipoCirurgia getTipoCirurgia() {
		return tipoCirurgia;
	}

	public void setTipoCirurgia(TipoCirurgia tipoCirurgia) {
		this.tipoCirurgia = tipoCirurgia;
	}

	public fichaPaciente getFichaPaciente() {
		return fichaPaciente;
	}

	public void setFichaPaciente(fichaPaciente fichaPaciente) {
		this.fichaPaciente = fichaPaciente;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cirurgia other = (Cirurgia) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

}
