'use client'

import Link from "next/link"
import { useUserStore } from "@/store"
import { useEffect, useState, useRef } from "react"
import { z } from 'zod'

export default function Employee() {
    const [search, setSearch] = useState('')
    const [employees, setEmployees] = useState([])
    const [render, setRender] = useState(false)
    const userStore = useUserStore()

    useEffect(() => {
        fetch(process.env.BE_URL + '/employees', {
            headers: {
                Authorization: `Bearer ${userStore.user?.token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => setEmployees(result.data))
            .catch(error => console.error(error.message))

        setRender(false)
    }, [render])

    const handleDelete = async (itemId) => {
        const response = await fetch(process.env.BE_URL + `/employees/${itemId}`, {
            headers: {
                Authorization: `Bearer ${userStore.user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                '_method': 'DELETE'
            })
        })
        const responseData = await response.json()
        setRender(true)
    }

    return (
        <>
            <ModalCreate setRender={setRender} />

            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Employee</p>
                <p className="text-base">Manage your employee's data</p>
            </div>
            <div className="flex flex-row w-full">
                <Link href="/bus-operator/employees" className="w-full text-center">
                    <p>Employee</p>
                    <hr className="border border-gray-500 w-full" style={{ height: '2px' }} />
                </Link>
                <Link href="/bus-operator/employees/status" className="w-full text-center">
                    <p>Employee's Status</p>
                    <hr className="border border-gray-300 w-full" style={{ height: '1px' }} />
                </Link>
            </div>

            <div className="flex flex-col w-full p-8">
                <div className="flex flex-row w-full">
                    <div className="w-full">
                        <div className="relative w-4/6">
                            <input type="text" id="hs-leading-icon" name="hs-leading-icon" className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="button" className="bg-purple-default text-white p-2 px-8 rounded" data-hs-overlay="#hs-static-backdrop-modal">New Employee</button>
                    </div>
                </div>

                <div className="flex flex-col mt-5">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-purple-default dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">ID No.</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Full Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Email</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Contact Number</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Employee Type</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-white uppercase dark:text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {employees.filter((item) => {
                                            return item.id_number.toString().includes(search) ||
                                                item.full_name.toString().includes(search) ||
                                                item.email.toLowerCase().includes(search.toLowerCase()) ||
                                                item.contact_number.toLowerCase().includes(search.toLowerCase()) ||
                                                item.employee_type.toString().includes(search)
                                        }).map((item, key) => (
                                            <tr key={key}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.id_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.full_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.contact_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.employee_type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex flex-row gap-2 justify-end">
                                                    <Link href={`/bus-operator/employees/${item.id}`} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Edit</Link>
                                                    <button onClick={(e => handleDelete(item.id))} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ModalCreate = ({ setRender }) => {
    const modalCloseBtnRef = useRef(null)
    const token = useUserStore((state) => state.user?.token)
    const initialState = {
        id_number: '',
        full_name: '',
        email: '',
        contact_number: '',
        employee_type: '',
    }
    const [employee, setEmployee] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setEmployee(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {

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

        const response = await fetch(process.env.BE_URL + '/employees', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(employee)
        })
        const responseData = await response.json()

        setEmployee(initialState)
        modalCloseBtnRef.current.click()
        setRender(true)
    }

    return (
        <>
            <div id="hs-static-backdrop-modal" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col  border shadow-sm rounded-xl pointer-events-auto bg-gray-200 ">
                        <div className="flex justify-between items-center py-3 px-4 ">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Bus Details
                            </h3>
                            <button type="button" ref={modalCloseBtnRef} className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-static-backdrop-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <div className="flex flex-col gap-4">

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">ID No</label>
                                    <input type="number" name="id_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="123" onChange={handleChange} />
                                    {errors?.id_number && <span className='text-xs text-red-500'>{errors.id_number[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Full Name</label>
                                    <input type="text" name="full_name" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="John Doe" onChange={handleChange} />
                                    {errors?.full_name && <span className='text-xs text-red-500'>{errors.full_name[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                                    <input type="email" name="email" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="***@***.com" onChange={handleChange} />
                                    {errors?.email && <span className='text-xs text-red-500'>{errors.email[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Contact Number</label>
                                    <input type="text" name="contact_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="+63-919-2345-123" onChange={handleChange} />
                                    {errors?.contact_number && <span className='text-xs text-red-500'>{errors.contact_number[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Employee Type</label>
                                    <select onChange={handleChange} name="employee_type" id="employee_type" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                        <option value="">Select</option>
                                        <option value="assistant_manager">ASSISTANT MANAGER</option>
                                        <option value="bus_driver">BUS DRIVER</option>
                                        <option value="bus_conductor">BUS CONDUCTOR</option>
                                    </select>
                                    {errors?.employee_type && <span className='text-xs text-red-500'>{errors.employee_type[0]}</span>}
                                </div>

                                <button onClick={handleSubmit} className="bg-purple-default text-white p-2 rounded w-full">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}