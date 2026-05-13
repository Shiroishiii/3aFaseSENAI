import ConsultsCounter from '../../components/counters/ConsultationCounter'
import ExamCounter from '../../components/counters/ExamCounter'
import PatientsCounter from '../../components/counters/PatientsCounter'

const Dashboard = () => {
    return (
        <div>
            <h1 className='text-xl font-bold text-cyan-800 mb-6'>Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                <PatientsCounter />
                <ConsultsCounter />
                <ExamCounter />
            </div>

            {/* Lista de pacientes */}
            <h2>Lista de pacientes</h2>
        </div>
    )
}

export default Dashboard