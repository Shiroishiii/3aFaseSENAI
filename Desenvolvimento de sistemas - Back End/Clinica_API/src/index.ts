import express from 'express';
import { prisma } from './prisma/prisma';
import type { Exame, Usuario } from './prisma/generated/prisma/client';

const app = express();
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

// Endpoints usuario
app.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
})

app.post("/usuarios", async (req, res) => {
  console.log(req.body)
  const dadosUsuario = req.body as Usuario
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null
    }
  })
  return res.status(201).json(usuarioCriado)
})

//Exames

app.get('/exame', async (req, res ) => {
  const exames = await prisma.exame.findMany()
  res.json(exames)
})

app.post('/exame', async (req, res) => {
  console.log (req.body)
  const dadosExames = req.body as Exame
  const exameCriado = await prisma.exame.create({
    data: {
      tipo_exame: dadosExames.tipo_exame,
      valor: dadosExames.valor,
      descricao: dadosExames.descricao,
      resultado: dadosExames.resultado,
      data_exame: new Date(dadosExames.data_exame)
    }
  })
  return res.status(201).json(exameCriado)
})

app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})