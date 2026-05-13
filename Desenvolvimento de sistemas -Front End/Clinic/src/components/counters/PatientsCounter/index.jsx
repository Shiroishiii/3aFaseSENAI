import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaHospitalUser } from 'react-icons/fa'

const PatientsCounter = () => {
    const [PatientsCounter, setPatientsCounter] = useState(0)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/patients')
                setPatientsCounter(response.data.length)
            } catch (error) {
                console.error('erro ao obter dados do pacientes', error)
            }
        }
        fetchPatients()
    }, [])

    return (
        <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
                <FaHospitalUser className='text-blue-600'/>{PatientsCounter}
            </h2>
            <p>Pacientes</p>
        </div>
    )
}

export default PatientsCounter