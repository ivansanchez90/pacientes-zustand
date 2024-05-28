import { usePacienteStore } from '../store/store'
import DetallesPaciente from './DetallesPaciente'

export const PatientsList = () => {
  const { pacientes } = usePacienteStore()

  return (
    <div className='md:w-1/2 lg:3/5 h-screen overflow-y-scroll'>
      {pacientes.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>
            Listado de Pacientes
          </h2>
          <p className='text-xl text-center mt-5 mb-10'>
            Adminsitra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes</span>
          </p>
          {pacientes.map((paciente) => (
            <DetallesPaciente key={paciente.id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2>
          <p className='text-xl text-center  mt-5 mb-10'>
            Agregue pacientes {''}
            <span className='text-indigo-600 font-bold'>
              y se mostraran aquí
            </span>
          </p>
        </>
      )}
    </div>
  )
}
