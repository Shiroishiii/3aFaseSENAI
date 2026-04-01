import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Autores = () => {

    const [autores, setAutores] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/autores")
        .then(res => res.json())
        .then(data => setAutores(data))
    }, [])

  return (
    <div className='flex gap-2 pt-5'>
        {
            autores.map(autor => (
                <div key={autor.id} className='card-autor'>
                    <img src={autor.foto} alt={autor.nome} />
                    <h1>{autor.nome}</h1>
                    <h3>{autor.cidade}</h3>
                    <h3>{autor.especialidade}</h3>
                    <p>{autor.descricao}</p>
                    <p>{autor.biografia}</p>
                    <Link to={`/autor/${autor.id}`} className='text-white bg-blue-500'>
                    Ver mais
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default Autores