package io.minhasaude.msapi.model;

import java.math.BigDecimal;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "paciente")
@OnDelete(action = OnDeleteAction.CASCADE)
@PrimaryKeyJoinColumn(name = "codigo_pessoa")
public class Paciente extends Pessoa {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@DecimalMin(value = "0.01", message = "Altura deve ser maior que 0.")
	@DecimalMax(value = "300.00", message = "Altura deve ser menor que 3 metros.")
	private BigDecimal altura;

	@DecimalMin(value = "0.01", message = "Peso não pode ser menor que 0.")
	@DecimalMax(value = "300.00", message = "Peso não pode ser maior que 300 kilos.")
	private BigDecimal peso;

	@Column(name = "tipo_sanguineo")
	private String tipoSanguineo;

	@Size(max = 30)
	private String registroSus;

	@Size(max = 30)
	private String nomeResponsavel;
	
	@JsonIgnore
	@OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
	private Collection<PacienteDoencasComuns> pacienteDoencasComuns;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public BigDecimal getAltura() {
		return altura;
	}

	public void setAltura(BigDecimal altura) {
		this.altura = altura;
	}

	public BigDecimal getPeso() {
		return peso;
	}

	public void setPeso(BigDecimal peso) {
		this.peso = peso;
	}

	public String getTipoSanguineo() {
		return tipoSanguineo;
	}

	public void setTipoSanguineo(String tipoSanguineo) {
		this.tipoSanguineo = tipoSanguineo;
	}

	public String getRegistroSus() {
		return registroSus;
	}

	public void setRegistroSus(String registroSus) {
		this.registroSus = registroSus;
	}

	public String getNomeResponsavel() {
		return nomeResponsavel;
	}

	public void setNomeResponsavel(String nomeResponsavel) {
		this.nomeResponsavel = nomeResponsavel;
	}

	public Collection<PacienteDoencasComuns> getPacienteDoencasComuns() {
		return pacienteDoencasComuns;
	}

	public void setPacienteDoencasComuns(Collection<PacienteDoencasComuns> pacienteDoencasComuns) {
		this.pacienteDoencasComuns = pacienteDoencasComuns;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((altura == null) ? 0 : altura.hashCode());
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
		Paciente other = (Paciente) obj;
		if (altura == null) {
			if (other.altura != null)
				return false;
		} else if (!altura.equals(other.altura))
			return false;
		return true;
	}

}
