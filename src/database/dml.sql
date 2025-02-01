use bancodequestoes;

INSERT INTO usuario (nome_user) VALUES
    ("Fábio Haruo")
;

INSERT INTO disciplina (id_user, nome_disciplina) VALUES
    (1, "Português"),
    (1, "Matemática"),
    (1, "Lab. de Programação III"),
    (1, "Filosofia")
;

INSERT INTO assunto (id_disciplina, id_user, nome_assunto) VALUES
    (1, 1, "Gramática"),
    (1, 1, "Redação"),
    (1, 1, "Literatura"),
    (2, 1, "Análise Combinatória"),
    (2, 1, "Matrizes"),
    (2, 1, "Cálculo 1"),
    (2, 1, "Sistemas Lineares"),
    (2, 1, "Geometria Euclidiana"),
    (2, 1, "Geometria de Posição"),
    (3, 1, "HTML5"),
    (3, 1, "CSS3"),
    (3, 1, "JS"),
    (4, 1, "Filósofo: Platão"),
    (4, 1, "Filósofo: Descartes"),
    (4, 1, "Filósofo: Simone de Beauvoir")
;
