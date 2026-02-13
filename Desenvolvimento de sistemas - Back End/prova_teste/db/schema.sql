CREATE DATABASE prova_db;

USE prova_db;

CREATE TABLE produtos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(150) NOT NULL,
    valor_unitario DECIMAL (10,2) NOT NULL,
    estoque_minimo INT NOT NULL DEFAULT 0,
    estoque_maximo INT NOT NULL DEFAULT 0,
    created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT NOT NULL,
    tipo ENUM('ENTRADA', 'SAIDA'),
    quantidade INT NOT NULL,
    data_movimentacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_movimentacoes_produtos
		FOREIGN KEY (produto_id) REFERENCES produtos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

INSERT INTO produtos (nome_produto, valor_unitario, estoque_minimo, estoque_maximo) 
VALUES ('Desinfetante', 25.00, 10, 45),
('Detergente', 15.00, 20, 50),
('Água sanitária', 20.00, 10, 40);

INSERT INTO movimentacoes (produto_id, tipo, quantidade, data_movimentacao)
VALUES (1, 'ENTRADA', 20, '2026-02-02 09:00:00'),
(1, 'SAIDA', 5 , '2026-02-03 08:30:00'),
(2, 'ENTRADA', 30, '2026-02-04 10:00:00'),
(2, 'SAIDA', 5, '2026-02-06 11:00:00'),
(3, 'ENTRADA', 30, '2026-02-01 07:00:00'),
(3, 'SAIDA', 20, '2026-02-03 13:00:00');


CREATE VIEW vw_estoque AS
SELECT p.id AS produto_id,
p.nome_produto,
p.valor_unitario,
SUM(
CASE
	WHEN m.tipo = 'ENTRADA' THEN m.quantidade
    WHEN m.tipo = 'SAIDA' THEN -m.quantidade
	ELSE 0
END) AS saldo_estoque,
SUM(
CASE 
	WHEN m.tipo = 'ENTRADA' THEN m.quantidade
    WHEN m.tipo = 'SAIDA' THEN -m.quantidade
	ELSE 0
END) * p.valor_unitario AS valor_total_item
FROM produtos p
LEFT JOIN movimentacoes m ON m.produto_id = p.id
GROUP BY p.id,
p.nome_produto,
p.valor_unitario;

SELECT * FROM vw_estoque;

SELECT * FROM produtos;
