import express from 'express';
import { auth } from './middleware/auth';
import cors from "cors"
import { authRouter } from './routes/auth';
import { UserRouter } from './routes/user';
import { exameRouter } from './routes/exames';

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

app.use(authRouter)
app.use(UserRouter)
app.use(exameRouter)

app.use(auth)

app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})