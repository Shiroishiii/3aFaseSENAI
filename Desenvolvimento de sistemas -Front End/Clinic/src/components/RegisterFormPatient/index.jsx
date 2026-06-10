import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

const RegisterFormPatient = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        birthdate: "",
        cpf: "",
        rg: "",
        maritalStatus: "",
        phone: "",
        email: "",
        birthplace: "",
        emergencyContact: "",
        allergies: "",
        specialCare: "",
        healthInsurance: "",
        insuranceNumber: "",
        insuranceValidity: "",
        address: {
            cep: "",
            city: "",
            state: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            reference: ""
        }
    })

    const [isSaving, setIsSaving] = useState(false)

    //handles

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAdressChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }))
    }

    // requisição para api viacep

    const fetchAddressData = async (cep) => {
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    cep: data.cep || "",
                    city: data.localidaade || "",
                    state: data.uf || "",
                    street: data.logradouro || "",
                    complement: data.complemento || "",
                    neighborhood: data.bairro || ""
                }
            }))
        } catch (error) {
            console.log("Erro ao buscar endereço", error)
        }
    }

    // tratamento do valor digitado no campo de cep

    const handleCepBlur = (e) => {
        const cep = e.target.value.replace(/\D/g, '')
        if (cep.lenght === 8) fetchAddressData(cep)
    }

    // submit form

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            await axios.post("http://localhost:3000/patients", formData)

            toast.success("Paciente cadastrado com sucesso", {
                autoClose: 2000,
                hideProgressBar: true
            })

            setFormData({
                fullName: "",
                gender: "",
                birthdate: "",
                cpf: "",
                rg: "",
                maritalStatus: "",
                phone: "",
                email: "",
                birthplace: "",
                emergencyContact: "",
                allergies: "",
                specialCare: "",
                healthInsurance: "",
                insuranceNumber: "",
                insuranceValidity: "",
                address: {
                    cep: "",
                    city: "",
                    state: "",
                    street: "",
                    number: "",
                    complement: "",
                    neighborhood: "",
                    reference: ""
                }
            })

        } catch (error) {
            console.error(error)
            toast.error("Erro ao salvar os dados!", {
                autoClose:2000,
                hideProgressBar:true
            })
        }
    }

    return (
        <div>
            
        </div>
    )
}

export default RegisterFormPatient