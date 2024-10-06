import { toast } from "react-toastify"
import { usePatientStore } from "../store/store"
import { Patient } from "../types"
import { PatientDetailItem } from "./PatientDetailItem"

type PatientDetailsProps = {
    patient: Patient
}

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
    
    //const { deletePatient, getPatientsById } = usePatientStore();
    const deletePatient = usePatientStore((state) => state.deletePatient);
    const getPatientsById = usePatientStore((state) => state.getPatientsById);

    const handleDeletePatient = () => {
        deletePatient(patient.id);
        toast.error('Paciente eliminado!');
    }

    return (
        <div className="mx-5  my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="nombre" data={patient.name} />
            <PatientDetailItem label="Propietario" data={patient.caretaker} />
            <PatientDetailItem label="email" data={patient.email} />
            <PatientDetailItem label="Fecha Alta" data={patient.date.toString()} />
            <PatientDetailItem label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col md:flex-row justify-between gap-3 mt-10">
                <button
                    onClick={() => getPatientsById(patient.id)}
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                >
                    Editar
                </button>
                <button
                    onClick={handleDeletePatient}
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}
