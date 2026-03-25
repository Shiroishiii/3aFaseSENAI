import express from 'express';
import bcrypt from 'bcrypt'
import { prisma } from './prisma/prisma';
import type { Exame, Usuario } from './prisma/generated/prisma/client';

const app = express();
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

// Endpoint cadastro
app.post("/cadastro", async (req, res) => {
  console.log(req.body)
  const saltRounds = 10
  const dadosUsuario = req.body as Usuario
  const senhaHasheada = await bcrypt.hash(dadosUsuario.senha, saltRounds)
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null,
      senha: senhaHasheada
    }
  })
  return res.status(201).json(usuarioCriado)
})

// Endpoint login
app.post ("/login", async (req, res) => {
  const {email, senha} = req.body as Usuario

  try {
    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" })
    }

    const user = await prisma.usuario.findUnique({
      where: {
        email: email
      }
    })

    if(!user){
      return res.status(401).json({message: "Credenciais inválidas"})
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if(!isPasswordValid){
      return res.status(401).json({message: "Credenciais inválidas"})
    }

    return res.status(200).json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        email: user.email
      }
    })
    
  }catch(error){
    console.error(error)
    return res.status(500).json({message: 'Erro no servidor'})
  }

})

// Endpoints usuario
app.get('/usuarios', async ( _, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
})


app.get('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuario);
})

app.put("/usuarios/:id", async (req, res) => {
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

app.delete('/usuarios/:id', async (req, res) => {
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

app.get('/exame/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where:{
      id: idExame
    }
  })

  return res.status(200).json(exame)
})

app.put ('/exame/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const dadosParaAtualizar = req.body as Omit<Exame, 'id'>

  const exameAtualizado = await prisma.exame.update({
    data:{
      ...dadosParaAtualizar
    },
    where:{
      id:idExame
    }
  })

  return res.status(200).json(exameAtualizado)
})

app.delete('/exame/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exameDeletado = await prisma.exame.delete({
    where: {
      id: idExame
    }
  })

  return res.status(200).json({
    mensagem: "Exame deletado com sucesso",
    data: exameDeletado
  });
})

app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})