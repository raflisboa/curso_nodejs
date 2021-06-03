CREATE TABLE usuarios(
    nome VARCHAR (50),
    email VARCHAR (100),
    idade INT 
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Lorem",
    "Lorem@loren.com",
    10
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Lorem1",
    "Lorem1@loren.com",
    20
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Lorem2",
    "Lorem2@loren.com",
    30
);

UPDATE usuarios SET nome = "novoLorem12" WHERE nome = "Lorem2";