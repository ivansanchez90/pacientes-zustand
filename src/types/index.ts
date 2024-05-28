export type Pacientes = {
  id: string
  name: string
  propietario: string
  email: string
  date: Date
  symptoms: string
}

export type BorradorPaciente = Omit<Pacientes, 'id'>
