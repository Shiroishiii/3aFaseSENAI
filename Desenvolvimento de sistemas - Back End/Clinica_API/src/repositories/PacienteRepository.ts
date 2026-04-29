import type { Paciente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class PacienteRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosPacientes() {
        return await prisma.paciente.findMany();
    }

    async buscarPacienteId(idPaciente: number) {
        return await prisma.paciente.findUnique({
            where: { id: idPaciente }
        });
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
        });
    }

    async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Omit<Paciente, 'id'>) {
        return await prisma.paciente.update({
            where: { id: idPaciente },
            data: { ...dadosParaAtualizar }
        });
    }

    async deletarPaciente(idPaciente: number) {
        return await prisma.paciente.delete({
            where: { id: idPaciente }
        });
    }
}

export const pacienteRepository = new PacienteRepository(prisma);