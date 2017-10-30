CREATE TABLE cirurgia (

	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    codigo_tipo_cirurgia BIGINT(20) NOT NULL,
    menbro VARCHAR(40) NOT NULL,
    data DATE NOT NULL,
    codigo_ficha BIGINT(20) NOT NULL,

    FOREIGN KEY (codigo_tipo_cirurgia) REFERENCES tipo_cirurgia(codigo),
    FOREIGN KEY (codigo_ficha) REFERENCES ficha_paciente(codigo)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;