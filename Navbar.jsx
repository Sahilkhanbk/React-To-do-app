import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-700 py-3 text-white'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'> iTask</span>
      </div>
      <ul className='flex gap-19 mx-5'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}
export default Navbar
