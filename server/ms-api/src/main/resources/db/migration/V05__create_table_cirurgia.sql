CREATE TABLE cirurgia (

	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(40) NOT NULL,
    menbro VARCHAR(20) NOT NULL,
    data DATE NOT NULL,
    codigo_paciente BIGINT(20) NOT NULL,

    FOREIGN KEY (codigo_paciente) REFERENCES paciente(codigo_pessoa)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;