export const Errors = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className='uppercase text-white text-center bg-red-600 font-bold text-sm p-3 my-4'>
      {children}
    </p>
  )
}
