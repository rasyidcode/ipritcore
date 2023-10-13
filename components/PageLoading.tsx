import { FaCircleNotch } from "react-icons/fa"

const PageLoading = () => {
  return (
    <div className='h-full flex justify-center items-center'>
        <div className="animate-spin text-4xl text-teal-500"><FaCircleNotch /></div>
    </div>
  )
}

export default PageLoading