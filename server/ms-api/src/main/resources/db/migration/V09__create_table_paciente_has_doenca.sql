CREATE TABLE doencas_paciente (

	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    obs VARCHAR(100),
    codigo_doenca BIGINT(20) NOT NULL,
    codigo_paciente BIGINT(20) NOT NULL,

    FOREIGN KEY (codigo_doenca) REFERENCES doenca_comunm (codigo),
    FOREIGN KEY (codigo_paciente) REFERENCES paciente (codigo_pessoa)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;