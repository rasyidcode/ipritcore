const CenteredMessage = ({ children, message }: {
  children: React.ReactNode,
  message: string
}) => {
  return (
    <div className='mt-5 flex flex-col justify-center items-center flex-1'>
      <div className='text-sm flex flex-col justify-center items-center text-teal-300'>
        <div className='text-7xl'>
          {children}
        </div>
        <span className='mt-3 font-extrabold'>{message}</span>
      </div>
    </div>
  )
}

export default CenteredMessage