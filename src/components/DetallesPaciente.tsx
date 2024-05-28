import { usePacienteStore } from '../store/store'
import { Pacientes } from '../types'
import { DetallesItem } from './DetallesItem'
import { toast } from 'react-toastify'

type DetallesPacienteProps = {
  paciente: Pacientes
}

const DetallesPaciente = ({ paciente }: DetallesPacienteProps) => {
  const eliminarPaciente = usePacienteStore((state) => state.deletePaciente)
  const getPacientById = usePacienteStore((state) => state.getPacientById)

  const handleClick = () => {
    eliminarPaciente(paciente.id)
    toast('Paciente Eliminado', {
      type: 'error',
    })
  }
  return (
    <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
      <DetallesItem label={'ID'} propiedad={paciente.id} />
      <DetallesItem label={'nombre'} propiedad={paciente.name} />
      <DetallesItem label={'propietario'} propiedad={paciente.propietario} />
      <DetallesItem label={'Correo'} propiedad={paciente.email} />
      <DetallesItem
        label={'Fecha de Alta'}
        propiedad={paciente.date.toString()}
      />
      <DetallesItem label={'Sintomas'} propiedad={paciente.symptoms} />
      <div className='flex flex-col lg:flex-row gap-3 justify-between mt-10'>
        <button
          type='button'
          className=' font-bold px-10 py-2 uppercase bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'
          onClick={() => getPacientById(paciente.id)}
        >
          Editar
        </button>
        <button
          type='button'
          className=' font-bold px-10 py-2 uppercase bg-red-600 hover:bg-red-700 text-white rounded-lg'
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
export default DetallesPaciente
