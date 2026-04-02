import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"


const Cadastro = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const navigate = useNavigate()

    const cadastrar = async () => {
        try {
            await axios.post('http://localhost:3000/cadastro', {
                email,
                nome,
                senha
            })
            navigate('/login')
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <div className='flex flex-col bg-gray-400 w-full justify-center items-center h-screen'>
                <form className='flex  gap-2 w-full flex-col items-center justify-center'>
                    <label htmlFor="name">Nome</label>

                    <input type="text" onChange={(e) => setNome(e.target.value)} name="email" id="" />

                    <label htmlFor="email">Email</label>

                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

                    <label htmlFor="password">Senha</label>

                    <input type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
                </form>
                <button onClick={cadastrar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>Cadastrar</button>

            </div >
        </>
    )
}

export default Cadastro