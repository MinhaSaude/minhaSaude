CREATE TABLE tipo_cirurgia (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia neurológica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia bucomaxilofacial');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia oftalmológica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia otorrinolaringológica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia de cabeça e pescoço');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia cardíaca');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia torácica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia do aparelho digestivo');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia vascular');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia ortopédica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia urológica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia ginecológica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia obstétrica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia oncológica');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia reconstrutiva');
INSERT INTO tipo_cirurgia (descricao) VALUES ('Cirurgia estética');
