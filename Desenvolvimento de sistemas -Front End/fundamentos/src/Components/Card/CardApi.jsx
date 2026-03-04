import { useEffect, useState } from 'react'
import styles from './Card.module.css'

export const CardApi = () => {

    // // let contador
    // const [contador,setContador] = useState(0)

    // const incrementarValor = () => {
    //     // contador++

    //     setContador(prev => prev + 1)
    //     console.log("contador: ", contador)

    const [users, setUsers] = useState([])

    const [filtro, setFiltro] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then(res => res.json())
            .then(data => setUsers(data))
        // .then(data => console.log(data))
    }, [])

    return (
        <>

            <input
                type="text"
                className={styles.input}
                placeholder='filtrar por nome...'
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            <div className={styles.cardContainerApi}>
                {
                    users.map((user) => (
                        <div className={styles.card} key={user.id}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.address.street}</p>
                            <p>Latitude:{user.address.geo.lat}</p>
                            <p>Longitude:{user.address.geo.lng}</p>
                        </div>
                    ))
                }
            </div>
            {/* <p>{contador}</p>
            <button onClick={incrementarValor}>Add</button> */}
        </>
    )
}