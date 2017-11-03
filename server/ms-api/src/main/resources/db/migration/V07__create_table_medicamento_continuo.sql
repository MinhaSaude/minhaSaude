CREATE TABLE medicamento_continuo (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    nome_comercial VARCHAR(45) NOT NULL, 
    principio_ativo VARCHAR(45),
    dosagem VARCHAR(20),
    rms VARCHAR(45),
    fabricante VARCHAR(45),
    codigo_paciente BIGINT(20) NOT NULL,

    FOREIGN KEY (codigo_paciente) REFERENCES paciente(codigo_pessoa)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;