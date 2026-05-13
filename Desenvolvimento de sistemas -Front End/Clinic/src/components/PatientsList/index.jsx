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
        <div>PatientsLis</div>
    )
}

export default PatientsList