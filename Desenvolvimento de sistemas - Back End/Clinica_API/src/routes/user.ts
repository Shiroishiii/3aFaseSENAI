import { createHash } from "../utils/createHash";
import type { Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";
import { Router } from 'express';



export const UserRouter = Router();

// Endpoints usuario
UserRouter.get('/usuarios', async (_, res) => {
  const usuarios = await prisma.usuario.findMany();
  return res.json(usuarios);
})

UserRouter.get('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuario);
})

UserRouter.post("/usuarios", async (req, res) => {
  const dadosUsuario = req.body as Usuario
  const senhaHash = await createHash(dadosUsuario.senha);
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null,
      senha: senhaHash
    }
  })
  return res.status(201).json(usuarioCriado)
})


UserRouter.put("/usuarios/:id", async (req, res) => {
  const idUsuario = Number(req.params.id)
  const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

  const usuarioAtualizado = await prisma.usuario.update({
    data: {
      ...dadosParaAtualizar
    },
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuarioAtualizado);
})

UserRouter.delete('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuarioDeletado = await prisma.usuario.delete({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json({
    mensagem: "Usuário deletado com sucesso!",
    data: usuarioDeletado
  });
})