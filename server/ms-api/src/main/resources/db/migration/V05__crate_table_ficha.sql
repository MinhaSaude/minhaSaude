CREATE TABLE ficha_paciente (

	codigo BIGINT(20) PRIMARY KEY NOT NULL,
    data_modificacao DATE NOT NULL,

    FOREIGN KEY (codigo) REFERENCES paciente(codigo_pessoa)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8;