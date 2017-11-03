CREATE TABLE alergia (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    tipo_alergia VARCHAR(20) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    codigo_paciente BIGINT(20) NOT NULL,

    FOREIGN KEY (codigo_paciente) REFERENCES paciente(codigo_pessoa)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;