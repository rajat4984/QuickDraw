import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <Link href="\">
        <h3 className='text-4xl flex justify-center m-4 text-my_purple' >Quick-Draw</h3>
        </Link>
    </nav>
  )
}

export default Navbar