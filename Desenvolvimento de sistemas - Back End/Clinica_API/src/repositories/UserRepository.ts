import type { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../prisma/prisma";
import type { Usuario } from "../prisma/generated/prisma/client";


export class UserRepository {
    constructor(private readonly prisma: PrismaClient){
        this.prisma = prisma
    }

    async getAllUser(){
        return prisma.usuario.findMany()
    }

    async getUserById(id: number){
        return prisma.usuario.findUnique({
            where: {id}
        })
    }

    async postUser(dadosUsuario: Usuario){
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || ""
            }
        })
    }
}

export const userRepository = new UserRepository(prisma)