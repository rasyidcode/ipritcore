import React from 'react'
import { FaAngry } from 'react-icons/fa'

const NoData = () => {
  return (
    <p className="text-sm flex flex-col justify-center items-center text-teal-300">
        <div className="text-7xl"><FaAngry /></div> <span className="mt-3 font-extrabold">No Data</span>
    </p>
  )
}

export default NoData