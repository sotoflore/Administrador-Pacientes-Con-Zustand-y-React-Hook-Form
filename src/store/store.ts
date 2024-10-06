import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { DraftPatient, Patient } from "../types";

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientsById: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {...patient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({
        patients: [],
        activeId: '',

        // Agregar pacientes
        addPatient: (data) => {

            const newPatient = createPatient(data)
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },

        // Eliminar pacientes
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },

        //Editar un paciente
        getPatientsById: (id) => {
            set(() => ({
                activeId: id
            }))
        },

        // Actualizar un paciente
        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                activeId: ''
            }))
        }
        }), {
            name: 'patient-storage',
            //storage: createJSONStorage(() => localStorage)// por defecto
    })
));