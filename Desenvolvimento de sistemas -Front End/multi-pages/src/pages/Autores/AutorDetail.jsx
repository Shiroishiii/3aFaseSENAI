import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const AutorDetail = () => {

    const {id} = useParams()
    const [autor, setAutor] = useState(null)

    useEffect(()=>{
        fetch(`http://localhost:3000/autores/${id}`)
        .then(res => res.json())
        .then(data => setAutor(data))
    }, [id])

    if(!autor) return <div>Carregando...</div>

  return (
    <div className='p-4'>
            <img src={autor.foto} alt={autor.nome} className='w-150 h-150'/>
            <h1 className='text-5xl font-bold'>{autor.nome}</h1>
            <h2>{autor.cidade}</h2>
            <h2>{autor.especialidade}</h2>
            <p>{autor.descricao}</p>
            <p>{autor.biografia}</p>
        </div>
  )
}

export default AutorDetail