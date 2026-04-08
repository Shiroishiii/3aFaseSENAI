import axios from "axios"
import { useState } from "react"

type Props = {
    setRegistrar: (x: any) => void;
}

export const Registrar = ({ setRegistrar }: Props) => {
    const [email, setEmail] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")

    const registrar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/cadastro", {
                email,
                nome,
                senha
            })
            if (response?.data) {
                setRegistrar(false)
                alert("Usuário criado com sucesso!")
            }
        } catch (error) {
            console.log(error)
            alert("Erro ao fazer o cadastro, tente novamente!")
        }
    }

}
return (
    <>
        <div className='flex flex-col bg-[#707070] w-full justify-center items-center h-screen'>
            <form className='flex gap-1rem flex-col items-center justify-center w-full max-w-3xs'>

                <span className="flex w-full flex-col gap-0.5">
                    <label htmlFor="name" className="self-start text-[#58bc82] font-semibold">Nome</label>
                    <input className=" rounded-xl p-1 w-full border-0 flex items-center gap-0.5 bg-[#9c9c9c60] outline-1 outline-[#707070] focus:outline-2 focus:outline-[#58bc82] " type="text" onChange={(e) => setNome(e.target.value)} name="email" id="" />
                </span>

                <span className="flex w-full flex-col gap-0.5">
                    <label htmlFor="email" className="self-start text-[#58bc82] font-semibold">Email</label>
                    <input className=" rounded-xl p-1 w-full border-0 flex items-center gap-0.5 bg-[#9c9c9c60] outline-1 outline-[#707070] focus:outline-2 focus:outline-[#58bc82] " type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />
                </span>

                <span className="flex w-full flex-col gap-0.5">
                    <label htmlFor="password" className="self-start text-[#58bc82] font-semibold">Senha</label>
                    <input className=" rounded-xl p-1 w-full border-0 flex items-center gap-0.5 bg-[#9c9c9c60] outline-1 outline-[#707070] focus:outline-2 focus:outline-[#58bc82] " type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
                </span>

                <span className="no-underline text-[#58bc82] p-1"><a href="#">Esqueceu a senha?</a></span>

                <button onClick={registrar} className='w-full flex items-center gap-2 px-3 py-4 rounded-full bg-[#9c9c9c60] text-[#efefef] border-0 cursor-pointer transition-all duration-300 font-semibold text-sm hover:bg-[#58bc82]'>Cadastrar</button>
            </form>

        </div >
    </>
)
}

export default Cadastro