CREATE TABLE pessoa (
    
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(50) NOT NULL,
    rg VARCHAR(20) NOT NULL,
    cpf_cnpj VARCHAR(20),
    nome VARCHAR(30) NOT NULL,
    data_nascimento DATE NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    status_civil VARCHAR(20) NOT NULL,
    ocupacao_profissional VARCHAR(50) NOT NULL,
    grau_escolaridade VARCHAR(50) NOT NULL,
    foto LONGBLOB NOT NULL,
    email VARCHAR(50) NOT NULL,
    codigo_endereco BIGINT(20) NOT NULL,
    codigo_telefone BIGINT(20) NOT NULL,

    FOREIGN KEY (codigo_endereco) REFERENCES endereco(codigo),
    FOREIGN KEY (codigo_telefone) REFERENCES telefone(codigo)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;