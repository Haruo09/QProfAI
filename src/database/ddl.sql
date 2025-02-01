DROP DATABASE IF EXISTS bancodequestoes;
CREATE DATABASE bancodequestoes;
USE bancodequestoes;

CREATE TABLE usuario (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(100)
);

CREATE TABLE disciplina (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    nome_disciplina VARCHAR(50),

    FOREIGN KEY (id_user) REFERENCES usuario(id_user)
);

CREATE TABLE assunto (
    id_assunto INT AUTO_INCREMENT PRIMARY KEY,
    id_disciplina INT,
    id_user INT,
    nome_assunto VARCHAR(50),
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
    FOREIGN KEY (id_user) REFERENCES usuario(id_user)
);

CREATE TABLE questao (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_disciplina INT NOT NULL,
    id_assunto INT NOT NULL,
    enunciado VARCHAR(255),
    alt1 VARCHAR(255),
    alt2 VARCHAR(255),
    alt3 VARCHAR(255),
    alt4 VARCHAR(255),
    alt5 VARCHAR(255),
    alt_certa CHAR(1),

    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
    FOREIGN KEY (id_assunto) REFERENCES assunto(id_assunto),
    FOREIGN KEY (id_user) REFERENCES usuario(id_user)
);