import React from 'react'
import MemLanding1 from './MemLanding1'

const DashBoard = () => {
  return (
    <>
    <div className="flex">
      {/* First Column */}
      <div className="w-1/4 bg-blue-500">
      </div>

      {/* Second Column */}
      <div className="w-3/4 bg-yellow-500">
        <MemLanding1/>
      </div>
    </div>
    </>
  )
}

export default DashBoard