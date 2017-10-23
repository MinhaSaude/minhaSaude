package io.minhasaude.msapi.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "pessoa")
@Inheritance(strategy = InheritanceType.JOINED)
public class Pessoa implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@NotNull
	private String uid;

	@NotNull
	private String rg;

	@Column(name = "cpf_cnpj")
	private String cpfCnpj;

	@NotNull
	@Size(min = 3, max = 30)
	private String nome;

	@NotNull
	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;

	@NotNull
	@Enumerated(EnumType.STRING)
	private Sexo sexo;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "status_civil")
	private StatusCivil statusCivil;

	@Size(max = 50)
	@Column(name = "ocupacao_profissional")
	private String ocupacaoProfissional;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "grau_escolaridade")
	private GrauEscolaridade graEscolaridade;

	@NotNull
	private String foto;

	@NotNull
	@Size(max = 50)
	private String email;

	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "codigo_endereco")
	private Endereco endereco;

	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "codigo_telefone")
	private Telefone telefone;

	public Pessoa() {
		super();
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpfCnpj() {
		return cpfCnpj;
	}

	public void setCpfCnpj(String cpfCnpj) {
		this.cpfCnpj = cpfCnpj;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;

	}

	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public StatusCivil getStatusCivil() {
		return statusCivil;
	}

	public void setStatusCivil(StatusCivil statusCivil) {
		this.statusCivil = statusCivil;
	}

	public String getOcupacaoProfissional() {
		return ocupacaoProfissional;
	}

	public void setOcupacaoProfissional(String ocupacaoProfissional) {
		this.ocupacaoProfissional = ocupacaoProfissional;
	}

	public GrauEscolaridade getGraEscolaridade() {
		return graEscolaridade;
	}

	public void setGraEscolaridade(GrauEscolaridade graEscolaridade) {
		this.graEscolaridade = graEscolaridade;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Telefone getTelefone() {
		return telefone;
	}

	public void setTelefone(Telefone telefone) {
		this.telefone = telefone;
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
		Pessoa other = (Pessoa) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

}
