type DetallesItemProps = {
  label: string
  propiedad: string
}

export const DetallesItem = ({ label, propiedad }: DetallesItemProps) => {
  return (
    <p className='mb-3 font-bold text-gray-700 uppercase'>
      {label}: {''}
      <span className='font-normal normal-case'>{propiedad}</span>
    </p>
  )
}
