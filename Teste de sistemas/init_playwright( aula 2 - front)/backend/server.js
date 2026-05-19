import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/usuarios', (req, res) => {
    res.json([
        { id: 1, nome: 'Isaac' },
        { id: 2, nome: 'Maria' }
    ])
})

app.listen(3000, () => {
    console.log('Servidor rodando')
})