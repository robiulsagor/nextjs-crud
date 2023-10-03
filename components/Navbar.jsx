import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-slate-300 py-6'>
            <div className='w-[800px]  mx-auto flex justify-between items-center'>
                <Link href='/' className='text-3xl font-bold'>
                    User CRUD APP...
                </Link>

                <Link href='/addUser' className='bg-slate-900 text-white p-2 rounded-md hover:bg-slate-600 transition-all'>Add User</Link>
            </div>
        </div>
    )
}

export default Navbar