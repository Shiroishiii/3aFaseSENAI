import { useState, useEffect } from "react"
import axios from "axios"
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router'

function PatientsList() {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [ages, setAges] = useState({})

    const calculateAge = (birthdate) => {
        if(!birthdate) return '-'
        const today = new Date()
        const birthdateDate = new Date(birthdate)
        let age = today.getFullYear() - birthdateDate.getFullYear()
        const montDiff = today.getMonth() - birthdateDate.getMonth()
        if (montDiff < 0 || (montDiff === 0 && today.getDate() < birthdate.getDate())){
            age--
        }
        return age
    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/patients')
                if(!response) return

                const patientsData = response.data

                // calcula a idade de cada paciente e armazena no estado

                const calculateAges = {}
                patientsData.forEach((patient) => {
                    calculateAges[patient.id] = calculateAge(patient.birthdate)
                })
                setAges(calculateAges)
                setPatients(patientsData)
            } catch (error) {
                console.error('Erro ao obter os dados de pacientes', error)
            }
        }
        fetchPatients()
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredPatients = patients.filter((patient) => 
    [patient.fullName, patient.email, patient.phone]
    .join(' ')
    .toLowerCase()
    .includes(searchTerm.toLowerCase)
    )

    return (
        <div className=" bg-white shadow rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-cyan-800 mb-4">
                Informacões Rápidas de Pacientes
            </h2>

            <div className="flex flex-col sm:items-center sm:justify-between mb-4 gap-3">
                <label htmlFor="search" className="text-gray-700 font-medium">
                    Buscar Paciente:
                </label>
                <input 
                type="text" 
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Digite o nome, email ou telefone"
                className="border rounded-lg px-3 py-2 w-full sm:w-80 focus:ring-2 focus:ring-cyan-600 outline-none"
                />
            </div>

            {
                filteredPatients.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {
                        filteredPatients.map((patient) =>(
                            <li 
                            key={patient.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-cyan-100 text-cyan-700 p-3 rounded-full">
                                        <FaUserAlt size={20}/>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-shadow-gray-800">{patient.fullname}</p>
                                        <p className="text-sm text-gray-600">{patient.email}</p>
                                        <p className="text-sm text-gray-600">{patient.phone}</p>
                                    </div>
                                </div>
                                
                                <div className="text-sm text-gray-600 mt-2 sm:mt-0 text-right">
                                    <p><strong>Idade:</strong>{ages[patient.id] || '-'} anos</p>
                                    <p><strong>Plano:</strong>{patient.healtInsurance || '-'}</p>
                                    <Link
                                    to={`/paciente/${patient.id}`}
                                    className="text-cyan-700 font-semibold hover:underline"
                                    >
                                        Ver Detalhes
                                    </Link>
                                </div>

                            </li>
                        ))
                        }
                    </ul>
                ): (
                    <p className="text-gray-500 text-center py-6">
                        Nenhum paciente encontrado
                    </p>
                )
            }
        </div>
    )
}

export default PatientsList