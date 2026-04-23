import type { Exame } from "../prisma/generated/prisma/client";
import { examRepository, type ExamRepository } from "../repositories/ExamRepository";

export class ExamService {
    constructor(private readonly repository: ExamRepository) { // TO-DO TIPAR SERVICE
    }

    async listarTodosExames() {
        const exames = await this.repository.listarTodosExames()
        return exames
    }

    async criarExame(dadosExame: Exame) {
        const exameCriado = await this.repository.criarExame({
            id: dadosExame.id,
            tipo_exame: dadosExame.tipo_exame,
            valor: dadosExame.valor,
            descricao: dadosExame.descricao,
            data_exame: new Date(dadosExame.data_exame),
            resultado: dadosExame.resultado
        })
        return exameCriado
    }

    async buscarExameId(idExame: number) {
        const exame = await this.repository.buscarExameId(idExame);
        return exame;
    }

    async atualizarExame(idExame: number, dadosParaAtualizar: Exame) {
        const exameAtualizado = await this.repository.atualizarExame(idExame, dadosParaAtualizar)
        return exameAtualizado;
    }


    async deletarExame(idExame: number) {
        const exame = await this.repository.deletarExame(idExame);
        return exame;
    }
}

export const examService = new ExamService(examRepository)