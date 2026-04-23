import express from 'express';
import { auth } from './middleware/auth';
import cors from "cors"
import { authRouter } from './routes/auth';
import { ExameRouter } from './routes/exames';
import { usuarioRouter } from './routes/user';


const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

app.use(authRouter)
app.use(usuarioRouter)
app.use(ExameRouter)

app.use(auth)

app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})