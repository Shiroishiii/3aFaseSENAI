import { Router } from "express";
import { examController } from "../controllers/ExamController";
import { Role } from "../prisma/generated/prisma/client";
import { roleMiddleware } from "../middleware/role";

export const ExameRouter = Router();
// ExameRouter.use(roleMiddleware([Role.ADMIN]))

// Endpoints usuario
ExameRouter.get('/exames', async (_, res) => {
  return examController.listarTodosExames(_, res)
})

ExameRouter.get('/exames/:id', async (req, res) => {
  return examController.buscarExameId(req, res)
})

ExameRouter.post("/exames", async (req, res) => {
  return examController.criarExame(req, res)
})


ExameRouter.put("/exames/:id", async (req, res) => {
  return examController.atualizarExame(req, res)
})

ExameRouter.delete('/exames/:id', async (req, res) => {
  return examController.deletarExame(req, res)
})