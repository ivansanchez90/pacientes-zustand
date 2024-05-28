import { useForm } from 'react-hook-form'
import { Errors } from './Errors'
import { BorradorPaciente } from '../types'
import { usePacienteStore } from '../store/store'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BorradorPaciente>()

  const { addPaciente, idActivo, pacientes, updatePacientes } =
    usePacienteStore()

  useEffect(() => {
    if (idActivo) {
      const pacienteActivo = pacientes.filter(
        (paciente) => paciente.id === idActivo
      )[0]
      setValue('name', pacienteActivo.name)
      setValue('propietario', pacienteActivo.propietario)
      setValue('email', pacienteActivo.email)
      setValue('date', pacienteActivo.date)
      setValue('symptoms', pacienteActivo.symptoms)
    }
  }, [idActivo])

  const registrarPaciente = (data: BorradorPaciente) => {
    if (idActivo) {
      updatePacientes(data)
      toast('Paciente Editado con Exito', {
        type: 'success',
      })
    } else {
      addPaciente(data)
      toast('Paciente Agregado con Exito', {
        type: 'success',
      })
    }
    reset()
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        noValidate
        onSubmit={handleSubmit(registrarPaciente)}
      >
        <div className='mb-5'>
          <label htmlFor='name' className='text-sm uppercase font-bold'>
            Paciente
          </label>
          <input
            id='name'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del Paciente'
            {...register('name', {
              required: 'El nombre del Paciente es Obligatorio',
            })}
          />
          {errors.name?.message && <Errors children={errors.name?.message} />}
        </div>

        <div className='mb-5'>
          <label htmlFor='caretaker' className='text-sm uppercase font-bold'>
            Propietario
          </label>
          <input
            id='caretaker'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del Propietario'
            {...register('propietario', {
              required: 'El nombre del Propietario es Obligatorio',
            })}
          />
          {errors.propietario?.message && (
            <Errors children={errors.propietario?.message} />
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='text-sm uppercase font-bold'>
            Email
          </label>
          <input
            id='email'
            className='w-full p-3  border border-gray-100'
            type='email'
            placeholder='Email de Registro'
            {...register('email', {
              required: 'El Email es Obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido',
              },
            })}
          />
          {errors.email?.message && <Errors children={errors.email?.message} />}
        </div>

        <div className='mb-5'>
          <label htmlFor='date' className='text-sm uppercase font-bold'>
            Fecha Alta
          </label>
          <input
            id='date'
            className='w-full p-3  border border-gray-100'
            type='date'
            {...register('date', {
              required: 'El campo Fecha es Obligatorio',
            })}
          />
          {errors.date?.message && <Errors children={errors.date?.message} />}
        </div>

        <div className='mb-5'>
          <label htmlFor='symptoms' className='text-sm uppercase font-bold'>
            Síntomas
          </label>
          <textarea
            id='symptoms'
            className='w-full p-3  border border-gray-100'
            placeholder='Síntomas del paciente'
            {...register('symptoms', {
              required: 'Los Sintomas son Obligatorio',
            })}
          />
          {errors.symptoms?.message && (
            <Errors children={errors.symptoms?.message} />
          )}
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value={`${idActivo ? 'Editar Paciente' : 'Guardar Paciente'}`}
        />
      </form>
    </div>
  )
}
