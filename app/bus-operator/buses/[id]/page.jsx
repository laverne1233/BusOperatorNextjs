'use client'

import { useUserStore } from "@/store"
import { redirectToRoute } from "@/utils/routing"
import { useEffect, useState } from "react"
import { z } from 'zod'


export default function BusUpdate({ params }) {
    const initialState = {
        id_number: '',
        bus_code: '',
        start_point: '',
        end_point: '',
        plate_number: '',
    }
    const [bus, setBus] = useState(initialState)
    const userStore = useUserStore()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetch(process.env.BE_URL + `/buses/${params.id}`, {
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
                setBus(result.data)
            })
            .catch(error => console.error(error.message))

    }, [])

    const handleChange = (e) => {
        setBus(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = async () => {
        const BusSchema = z.object({
            id_number: z.string().min(1, { message: 'Should not be empty' }).refine((num) => num >= 0, { message: 'Should be a non-negative number' }),
            bus_code: z.string().min(1, { message: 'Should not be empty' }),
            start_point: z.string().min(1, { message: 'Should not be empty' }),
            end_point: z.string().min(1, { message: 'Should not be empty' }),
            plate_number: z.string().min(1, { message: 'Should not be empty' }),
        });

        const result = BusSchema.safeParse(bus)
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            return
        }

        const response = await fetch(process.env.BE_URL + `/buses/${params.id}`, {
            headers: {
                Authorization: `Bearer ${userStore.user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                '_method': 'PUT',
                ...bus
            })
        })
        const responseData = await response.json()

        window.location.replace(redirectToRoute('/buses'))
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
                                <input value={bus.id_number || ''} type="number" name="id_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="1234" onChange={handleChange} />
                                {errors?.id_number && <span className='text-xs text-red-500'>{errors.id_number[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Bus Code</label>
                                <input value={bus.bus_code || ''} type="text" name="bus_code" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="13C" onChange={handleChange} />
                                {errors?.bus_code && <span className='text-xs text-red-500'>{errors.bus_code[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Start Point</label>
                                <input value={bus.start_point || ''} type="text" name="start_point" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Cebu" onChange={handleChange} />
                                {errors?.start_point && <span className='text-xs text-red-500'>{errors.start_point[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">End Point</label>
                                <input value={bus.end_point || ''} type="text" name="end_point" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Cebu" onChange={handleChange} />
                                {errors?.end_point && <span className='text-xs text-red-500'>{errors.end_point[0]}</span>}
                            </div>

                            <div className="relative">
                                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Plate Number</label>
                                <input value={bus.plate_number || ''} type="text" name="plate_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="123-098-GB" onChange={handleChange} />
                                {errors?.plate_number && <span className='text-xs text-red-500'>{errors.plate_number[0]}</span>}
                            </div>

                            <button type='submit' onClick={handleUpdate} className='bg-purple-default text-white rounded-lg py-2 px-4 mt-4 w-full'>Update</button>

                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}
