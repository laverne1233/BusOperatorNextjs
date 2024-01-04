'use client'

import { useUserStore } from "@/store"
import { redirectToRoute } from "@/utils/routing"
import { useEffect, useState } from "react"
import { z } from 'zod'


export default function BusUpdate({ params }) {
    const userStore = useUserStore()
    const initialState = {
        id_number: '',
        full_name: '',
        email: '',
        contact_number: '',
        employee_type: '',
    }
    const [employee, setEmployee] = useState(initialState)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetch(process.env.BE_URL + `/employees/${params.id}`, {
            headers: {
                Authorization: `Bearer ${userStore.user?.token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                if (!result.success) {
                    window.location.replace('/404')
                }
                setEmployee(result.data)
            })
            .catch(error => console.error(error.message))

    }, [])

    const handleChange = (e) => {
        setEmployee(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = async () => {
        const EmployeeSchema = z.object({
            id_number: z.string().min(1, { message: 'Should not be empty' }).refine((num) => num >= 0, { message: 'Should be a non-negative number' }),
            full_name: z.string().min(1, { message: 'Should not be empty' }),
            email: z.string().email().min(1, { message: 'Should not be empty' }),
            contact_number: z.string().min(1, { message: 'Should not be empty' }),
            employee_type: z.string().min(1, { message: 'Should not be empty' }),
        });

        const result = EmployeeSchema.safeParse(employee)

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            return
        }

        const response = await fetch(process.env.BE_URL + `/employees/${params.id}`, {
            headers: {
                Authorization: `Bearer ${userStore.user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                '_method': 'PUT',
                ...employee
            })
        })
        const responseData = await response.json()

        window.location.replace(redirectToRoute('/employees'))
    }

    return (
        <>
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Bus</p>
                <p className="text-base">Update Bus Information</p>
            </div>
            <div className='flex justify-center'>
                <div className="bg-slate-200 border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-4 w-1/2 ">
                    <div className='flex flex-col gap-10'>
                        <section className='flex flex-col gap-4 mx-5 px-5'>
                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">ID No</label>
                                <input value={employee?.id_number} type="number" name="id_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="123" onChange={handleChange} />
                                {errors?.id_number && <span className='text-xs text-red-500'>{errors.id_number[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Full Name</label>
                                <input value={employee?.full_name} type="text" name="full_name" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="John Doe" onChange={handleChange} />
                                {errors?.full_name && <span className='text-xs text-red-500'>{errors.full_name[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                                <input value={employee?.email} type="email" name="email" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="***@***.com" onChange={handleChange} />
                                {errors?.email && <span className='text-xs text-red-500'>{errors.email[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Contact Number</label>
                                <input value={employee?.contact_number} type="text" name="contact_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="+63-919-2345-123" onChange={handleChange} />
                                {errors?.contact_number && <span className='text-xs text-red-500'>{errors.contact_number[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Employee Type</label>
                                <select value={employee?.employee_type} onChange={handleChange} name="employee_type" id="employee_type" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                    <option value="">Select</option>
                                    <option value="assistant_manager">ASSISTANT MANAGER</option>
                                    <option value="bus_driver">BUS DRIVER</option>
                                    <option value="bus_conductor">BUS CONDUCTOR</option>
                                </select>
                                {errors?.employee_type && <span className='text-xs text-red-500'>{errors.employee_type[0]}</span>}
                            </div>

                            <button type='submit' onClick={handleUpdate} className='bg-purple-default text-white rounded-lg py-2 px-4 mt-4 w-full'>Update</button>

                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}
