import type { Request, Response } from "express";
import type { Usuario } from "../prisma/generated/prisma/client";
import { UserService, userService } from "../services/UserService";

class UserController {
    constructor(private readonly service: UserService) {
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const usuarios = await this.service.getAllUser();
            return res.json(usuarios);
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const usuario = await this.service.getUserById(idUsuario)
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async postUser(req: Response, res: Response) {
        try {
            const dadosUsuario = req.body as Usuario
            
            const usuarioCriado = await this.service.postUser({
                    email: dadosUsuario.email,
                    nome: dadosUsuario.nome || null,
                    senha: senhaHash
            })
            return res.status(201).json(usuarioCriado)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async putUser(req: Response, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

            const usuarioAtualizado = await this.service.usuario.update({
                data: {
                    ...dadosParaAtualizar
                },
                where: {
                    id: idUsuario
                }
            })

            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }


    async deleteUser(req: Response, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const usuarioDeletado = await this.service.usuario.delete({
                where: {
                    id: idUsuario
                }
            })
            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso!",
                data: usuarioDeletado
            });
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }
}

export const userController = new UserController(userService)
