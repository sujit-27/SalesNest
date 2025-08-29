import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className={`bg-gray-50 text-black border-b border-gray-200 relative z-40`}
        >
            <div className='py-2 max-w-7xl mx-auto'>
                {/* Main container: flex-col on mobile to stack search below logo, flex-row on sm+ */}
                <div className='flex flex-col'>
                    <div className="flex flex-row justify-between items-center gap-3">
                        {/* Logo and Links Section */}
                        <div className='flex items-center gap-10'>
                            <Link
                            className="flex items-center font-bold text-2xl sm:text-3xl"
                            to="/"
                            >
                            {/* Desktop Text + Icon */}
                            <span className="flex items-center text-gray-700">
                                CRMify
                            </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </>
  )
}

export default Navbar
