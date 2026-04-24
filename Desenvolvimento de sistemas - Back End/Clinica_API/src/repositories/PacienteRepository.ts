import type { Decimal } from "@prisma/client/runtime/client";
import type { Paciente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class PacienteRepository {
    buscarExameId(idExame: number) {
        throw new Error("Method not implemented.");
    }
    atualizarExame(idExame: number, dadosParaAtualizar: { id: number; tipo_exame: string; valor: Decimal; descricao: string; resultado: string; data_exame: Date; pacienteId: number | null; }) {
        throw new Error("Method not implemented.");
    }
    deletarExame(idExame: number) {
        throw new Error("Method not implemented.");
    }
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTodosPacientes() {
        const pacientes = await prisma.paciente.findMany();
        return pacientes
    }

    async buscarPacienteId(idPaciente: number) {
        const paciente = await prisma.paciente.findUnique({
            where: {
                id: idPaciente
            }
        })
        return paciente;
    }

    async criarPaciente(dadosPaciente: Omit<Paciente, 'id'>) {
        return await this.prisma.paciente.create({
            data: {
                nome: dadosPaciente.nome,
                cpf: dadosPaciente.cpf,
                telefone: dadosPaciente.telefone,
                email: dadosPaciente.email,
                data_nascimento: dadosPaciente.data_nascimento,
                sexo: dadosPaciente.sexo,
                responsavel: dadosPaciente.responsavel
            }
        })
    }

    async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Omit<Paciente, 'id'>) {
        const pacienteAtualizado = await prisma.paciente.update({
            data: {
                ...dadosParaAtualizar
            },
            where: {
                id: idPaciente
            }
        })

        return pacienteAtualizado
    }
    async deletarPaciente(idPaciente: number) {
        const paciente = await prisma.paciente.delete({
            where: {
                id: idPaciente
            }
        })
        return paciente;
    }
}

export const pacienteRepository = new PacienteRepository(prisma)