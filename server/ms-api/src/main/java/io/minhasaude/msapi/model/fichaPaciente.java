package io.minhasaude.msapi.model;

import java.time.LocalDate;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ficha_paciente")
public class fichaPaciente {

	@Id
	private Long codigo;

	@Column(name = "data_modificacao")
	private LocalDate dataModificacao;

	@OneToMany(mappedBy = "fichaPaciente", cascade = CascadeType.ALL)
	private Collection<Cirurgia> cirurgias;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public LocalDate getDataModificacao() {
		return dataModificacao;
	}

	public void setDataModificacao(LocalDate dataModificacao) {
		this.dataModificacao = dataModificacao;
	}

	public Collection<Cirurgia> getCirurgias() {
		return cirurgias;
	}

	public void setCirurgias(Collection<Cirurgia> cirurgias) {
		this.cirurgias = cirurgias;
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
		fichaPaciente other = (fichaPaciente) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

}
