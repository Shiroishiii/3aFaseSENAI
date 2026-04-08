import axios from "axios"
import { useState } from "react"

type Props = {
    setDataLogin: (data: any) => void;
    setRegistrar: (registrar: boolean) => void;
}

export const Login = ({ setDataLogin, setRegistrar }: Props) => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
  const logar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                senha
            })
            if (response?.data) {
                setDataLogin(response.data)
                localStorage.setItem("tokenAcesso", response.data.accessToken)
                localStorage.setItem("tokenRefresh", response.data.refreshToken)
            }
        } catch (error) {
            console.log(error)
            alert("Erro ao fazer o login, verifique suas credenciais!")
        }
    }

  }
  return (
    <>
      {dataLogin !== null ? (
        <div className='flex flex-col bg-[#707070] w-full justify-center items-center h-screen'>
          <h1 className='text-2xl font-semibold text-white'>Seja bem-vindo fulaninho</h1>
          <button className='bg-red-800 px-5 py-2 text-white rounded-2xl' onClick={() => setDataLogin(null)}>Sair</button>
        </div>
      ) : (
        < div className='flex flex-col bg-[#707070] w-full justify-center items-center h-screen'>
          <form className='flex gap-1rem flex-col items-center justify-center max-w-2xs'>

            <span className='flex w-full flex-col gap-0.5'>
              <label htmlFor="email" className="self-start text-[#58bc82] font-semibold">Email</label>
              <input className=" rounded-xl p-1 w-full border-0 flex items-center gap-0.5 bg-[#9c9c9c60] outline-1 outline-[#707070] focus:outline-2 focus:outline-[#58bc82] " type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />
            </span>

            <span>
              <label htmlFor="password" className="self-start text-[#58bc82] font-semibold">Senha</label>
              <input className=" rounded-xl p-1 w-full border-0 flex items-center gap-0.5 bg-[#9c9c9c60] outline-1 outline-[#707070] focus:outline-2 focus:outline-[#58bc82] " type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
            </span>

            <span className="no-underline text-[#58bc82] p-1"><a href="#">Não possui cadastro? Se cadastre aqui</a></span>

            <button onClick={logar} className='w-full flex items-center gap-2 px-3 py-4 m-4 rounded-full bg-[#9c9c9c60] text-[#efefef] border-0 cursor-pointer transition-all duration-300 font-semibold text-sm hover:bg-[#58bc82]'>Login</button>
          </form>

        </div >
      )
      }

    </>
  )
}

export default Login