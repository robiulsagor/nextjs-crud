"use client"

import axios from 'axios'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const Update = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const idParams = useSearchParams()
    const id = idParams.get('id')

    useEffect(() => {
        try {
            const userInfo = async () => {
                const res = await axios.get(`/api/users/${id}`)
                const { data } = res
                setName(data.name)
                setEmail(data.email)
            }
            userInfo()
        } catch (error) {
            console.log("log err");
        }
    }, [])

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        if (!name || !email) {
            alert("Please fill up all the form")
            return;
        }

        try {
            const res = await axios.put(`/api/users/${id}`, { name, email })
            console.log(res?.data);
            console.log(res);

            if (res?.data.message === 'success') {
                console.log("okay");
                router.push('/')
            } else {
                console.log("err");
            }

            // if (res.status === 204) {
            //     
            // } else {
            //     console.log("err");
            // }
        } catch (error) {
            console.log("Error saving user ", error);
        }
    }
    return (
        <div className=" flex items-center w-full justify-center mt-5">
            <div className="bg-slate-200 p-10 rounded-md w-fit min-w-[450px]  text-center mx-auto">

                <h2 className='text-3xl font-mono font-bold mb-6'>Update User Details</h2>
                <form className='flex flex-col gap-4'
                    onSubmit={handleSubmit}>
                    <input type="text" placeholder='User Name' className='p-1 px-3 rounded outline-none' value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder='User Email' className='p-1 px-3 rounded outline-none' value={email} onChange={e => setEmail(e.target.value)} />

                    <div className='flex items-center gap-4'>
                        <button type='submit' className='bg-green-600 flex-1 p-2 rounded text-white hover:bg-green-400 transition-all'>Update User</button>
                        <Link href='/' className='bg-red-600 flex-1 p-2 rounded text-white hover:bg-red-400 transition-all'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update