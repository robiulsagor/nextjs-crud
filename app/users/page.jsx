"use client"

import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react";



const Users = () => {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('/api/users')
                setUsers(res.data)
                setLoading(false)
                console.log(res);
            } catch (error) {
                setUsers([])
                setLoading(false)
                setErr(true)
            }
        }
        getUsers()
    }, [])

    const handleDelete = async (id) => {
        setUsers(users.filter(user => user._id !== id))

        try {
            const deletd = await axios.delete(`/api/users?id=${id}`)
            console.log(deletd);
        } catch (error) {
            console.log("Error deleting user. ", error);
        }
    }

    let sl = 1

    return (
        <div className=" flex items-center w-full justify-center mt-5">
            <div className="bg-slate-200 p-4 rounded-md w-fit min-w-[500px]  text-center mx-auto">
                {
                    loading ? (
                        <p>Loading</p>
                    ) : err ? (
                        <p>Error</p>
                    ) : users.length === 0 ? (
                        <p>No data to show</p>
                    ) : (

                        <table className="mx-auto">
                            <thead>
                                <tr>
                                    <th>Sl.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map(user => (
                                    <tr key={user._id}>
                                        <td>{sl++} </td>
                                        <td>{user.name} </td>
                                        <td>{user.email} </td>
                                        <td>
                                            <Link href={`/update?id=${user._id}`} className="bg-slate-700 text-white py-1 px-2 text-sm rounded mr-2 hover:bg-slate-900 transition-all">
                                                Update
                                            </Link>
                                            <button type="button" className="bg-red-700 text-white py-1 px-2 text-sm rounded hover:bg-red-900 transition-all"
                                                onClick={() => handleDelete(user._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}

export default Users