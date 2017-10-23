CREATE TABLE paciente (

    codigo_pessoa BIGINT(20) PRIMARY KEY NOT NULL,
    codigo_ficha BIGINT(20),
    codigo_cartao BIGINT(20),

    altura VARCHAR (10),
    peso VARCHAR (10),
    tipo_sanguineo VARCHAR(15),
    registro_sus VARCHAR (30),
    codigo_responsavel BIGINT(20),
    nome_responsavel VARCHAR (40),

    FOREIGN KEY (codigo_pessoa) REFERENCES pessoa(codigo)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8;