import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { BorradorPaciente, Pacientes } from '../types'
import { v4 as uudiv4 } from 'uuid'

type PacientesState = {
  pacientes: Pacientes[]
  idActivo: Pacientes['id']
  addPaciente: (data: BorradorPaciente) => void
  deletePaciente: (id: Pacientes['id']) => void
  getPacientById: (id: Pacientes['id']) => void
  updatePacientes: (data: BorradorPaciente) => void
}

export const usePacienteStore = create<PacientesState>()(
  devtools(
    persist(
      (set) => ({
        pacientes: [],
        idActivo: '',
        addPaciente: (data) => {
          const registrarPaciente = (paciente: BorradorPaciente): Pacientes => {
            return { ...paciente, id: uudiv4() }
          }
          const newPaciente = registrarPaciente(data)
          set((state) => ({
            pacientes: [...state.pacientes, newPaciente],
          }))
        },
        deletePaciente: (id) => {
          set((state) => ({
            pacientes: state.pacientes.filter((paciente) => paciente.id !== id),
          }))
        },
        getPacientById: (id) => {
          set(() => ({
            idActivo: id,
          }))
        },
        updatePacientes: (data) => {
          set((state) => ({
            pacientes: state.pacientes.map((paciente) =>
              paciente.id === state.idActivo
                ? { id: state.idActivo, ...data }
                : paciente
            ),
            idActivo: '',
          }))
        },
      }),
      {
        name: 'paciente-storage',
      }
    )
  )
)
