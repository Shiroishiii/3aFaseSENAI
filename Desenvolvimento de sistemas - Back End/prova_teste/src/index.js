import { pool } from "./config.js";
import { buscarProdutoPorId, cadastrarEstoque, cadastrarProduto, produtosMaiorEntradaNoPeriodo, produtosMaiorSaidaNoPeriodo,} from "./limpezaService.js";

async function main(){
    console.log(await buscarProdutoPorId(1))

    console.log (await cadastrarProduto ('Cloro', 15.00, 10, 30))

    console.log (await cadastrarEstoque(4, 'ENTRADA', 20, '2026-02-08 09:00:00'))
    console.log (await cadastrarEstoque(4, 'SAIDA', 5, '2026-02-08 09:00:00'))
    
    const dataInicial = '2026-01-01 00:00:00';
    const dataFinal = '2026-12-31 23:59:59';
    console.log (await produtosMaiorSaidaNoPeriodo(dataInicial, dataFinal))
    console.log (await produtosMaiorEntradaNoPeriodo(dataInicial, dataFinal))
}

main().catch(error=>
    console.error(error)
).finally(async()=>{
    await pool.end();
})