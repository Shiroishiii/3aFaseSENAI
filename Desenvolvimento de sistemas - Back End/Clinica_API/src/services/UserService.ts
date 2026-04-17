import { createHash } from "../utils/createHash";
import { userRepository, UserRepository } from "../repositories/UserRepository"
import type { Usuario } from "../prisma/generated/prisma/client"


export class UserService {
    constructor(private readonly repository: UserRepository) {

    }

    async getAllUser() {
        const usuario = await this.repository.getAllUser()
        return usuario
    }

    async getUserById(id: number) {
        const usuario = await this.repository.getUserById(id)
        return usuario
    }

    async postUser(dadosUsuario: Usuario) {
        const senhaHash = await createHash(dadosUsuario.senha);

        const usuarioCriado = await this.repository.postUser({
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null,
            senha: senhaHash
        })
        return usuarioCriado
    }
}

export const userService = new UserService(userRepository)