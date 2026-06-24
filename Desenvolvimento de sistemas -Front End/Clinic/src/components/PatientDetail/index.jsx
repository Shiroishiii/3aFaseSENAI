import { useEffect } from "react"


const PatientDetail = () => {

    const { id } = useParams()
    const [patient, setPatient] = useState({})
    const [consults, setConsults] = useState([])
    const [exams, setExams] = useState([])

    //consultas

    const [editingConsult, setEditingConsult] = useState(null)
    const [editingConsultData, setEditingConsultData] = useState({
        reason: "",
        date: "",
        time: "",
        description: "",
        medication: "",
        dosagePrecautions: "",
    })

    //exams
    const [editingExam, setEditingExam] = useState(null)
    const [editingExamData, setEditingExamData] = useState({
        name: "",
        date: "",
        time: "",
        type: "",
        laboratory: "",
        documentUrl: "",
        results: "",
    })

    useEffect(() => {
        const fetchPatientsDetail = async () => {
            try{
                const patientRes = await axios.get(`http://localhost:3000/patients/${id}`)
                setPatient(patientRes.data)

                const consultsRes = await axios.get(`http://localhost:3000/consults?patientId=${id}`)
                setConsults(consultsRes.data)

                const examsRes = await axios.get(`http://localhost:3000/exams?patientId=${id}`)
                setExams(examsRes.data)
            } catch (error) {
                console.error("Erro ao obter detalhes do paciente:", error)
            }
        }

        fetchPatientsDetail()
    }, [id])

    return (
        <div>PatientDetail</div>
    )
}

export default PatientDetail