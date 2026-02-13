import { pool } from "./config.js";

export async function buscarProdutoPorId(produtoId) {
    const [rows] = await pool.query("SELECT * FROM produtos WHERE id=?",
        [produtoId]
    )
    console.log(rows)
    return rows[0]
}

export async function cadastrarProduto(nome_produto, valor_unitario, estoque_minimo, estoque_maximo) {

    const [rows] = await pool.query("INSERT INTO produtos (nome_produto,valor_unitario, estoque_minimo, estoque_maximo) VALUES ( ?, ? ,?, ?)",
        [nome_produto, valor_unitario, estoque_minimo, estoque_maximo]
    ) 
    return {
        produto: nome_produto,
        valor_unitario: valor_unitario,
        estoque_minimo: estoque_minimo,
        estoque_maximo: estoque_maximo
    }
}

export async function produtosMaiorSaidaNoPeriodo(dataInicial, dataFinal) {
    const [rows] = await pool.query(`SELECT p.id AS produto_id, 
        p.nome_produto AS produto, 
        p.valor_unitario, 
        m.quantidade_total_saida 
        FROM produtos p
        LEFT JOIN 
        ( SELECT produto_id, SUM(quantidade) AS quantidade_total_saida 
         FROM movimentacoes 
         WHERE tipo = 'SAIDA' 
         AND data_movimentacao 
         BETWEEN ? AND ? 
         GROUP BY produto_id ) m ON m.produto_id = p.id 
         ORDER BY m.quantidade_total_saida DESC`,
        [dataInicial, dataFinal]);
    return rows.map((item) => {
        const quantidade = item.quantidade_total_saida; 
        const valorUnitario = item.valor_unitario;
        return { 
            produto: item.produto, 
            quantidade_total_saida: quantidade, 
            valor_total_financeiro_saidas: quantidade * valorUnitario 
        };
    });
} 

export async function cadastrarEstoque(produto_id, tipo, quantidade, data_movimentacao) {
    const [rows] = await pool.query('INSERT INTO movimentacoes (produto_id, tipo, quantidade, data_movimentacao) VALUES (?, ?, ?, ?)',
        [produto_id, tipo, quantidade, data_movimentacao]
    )
    return {
        ID_produto: produto_id,
        Tipo: tipo,
        Quantidade: quantidade,
        data_movimentacao: data_movimentacao
    }
}

export async function produtosMaiorEntradaNoPeriodo(dataInicial, dataFinal) {
    const [rows] = await pool.query(`SELECT p.id AS produto_id, 
        p.nome_produto AS produto, 
        p.valor_unitario, 
        m.quantidade_total_entrada 
        FROM produtos p
        INNER JOIN
        ( SELECT produto_id, SUM(quantidade) AS quantidade_total_entrada
         FROM movimentacoes 
         WHERE tipo = 'ENTRADA' 
         AND data_movimentacao 
         BETWEEN ? AND ? 
         GROUP BY produto_id ) m ON m.produto_id = p.id 
         ORDER BY m.quantidade_total_entrada DESC`,
        [dataInicial, dataFinal]);
    return rows.map((item) => {
        const quantidade = item.quantidade_total_entrada; 
        const valorUnitario = item.valor_unitario;
        return { 
            produto: item.produto, 
            quantidade_total_entrada: quantidade, 
            valor_total_financeiro_entradas: quantidade * valorUnitario 
        };
    });
}



export async function identificarLimite() {
    const [rows] = await pool.query{`SELECT p.id AS produto_id, 
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
p.valor_unitario`,)
    console.log(rows)
    return rows[0]
}