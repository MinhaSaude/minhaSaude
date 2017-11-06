CREATE TABLE pessoa (
    
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(50) NOT NULL UNIQUE,
    tipo VARCHAR(10) NOT NUll,
    rg VARCHAR(20) NULL,
    cpf_cnpj VARCHAR(20) UNIQUE,
    nome VARCHAR(30) NULL,
    data_nascimento DATE NULL,
    sexo VARCHAR(10) NULL,
    status_civil VARCHAR(20) NULL,
    ocupacao_profissional VARCHAR(50) NULL,
    grau_escolaridade VARCHAR(50) NULL,
    foto LONGBLOB NULL,
    email VARCHAR(50) NOT NULL,
    codigo_endereco BIGINT(20) NULL,
    codigo_telefone BIGINT(20) NULL,

    FOREIGN KEY (codigo_endereco) REFERENCES endereco(codigo),
    FOREIGN KEY (codigo_telefone) REFERENCES telefone(codigo)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;