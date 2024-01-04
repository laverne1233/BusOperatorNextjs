import { useEffect, useRef, useState } from "react"
import { useUserStore } from "@/store"
import { z } from 'zod'

export const ModalCreate = ({ setRender }) => {
    const modalCloseBtnRef = useRef(null)
    const token = useUserStore((state) => state.user?.token)
    const initialState = {
        id_number: '',
        bus_code: '',
        start_point: '',
        end_point: '',
        plate_number: '',
    }
    const [bus, setBus] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setBus(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {

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

        const response = await fetch(process.env.BE_URL + '/buses', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(bus)
        })
        const responseData = await response.json()

        setBus(initialState)
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
                                    <input type="number" name="id_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="1234" onChange={handleChange} />
                                    {errors?.id_number && <span className='text-xs text-red-500'>{errors.id_number[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Bus Code</label>
                                    <input type="text" name="bus_code" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="13C" onChange={handleChange} />
                                    {errors?.bus_code && <span className='text-xs text-red-500'>{errors.bus_code[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Start Point</label>
                                    <input type="text" name="start_point" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Cebu" onChange={handleChange} />
                                    {errors?.start_point && <span className='text-xs text-red-500'>{errors.start_point[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">End Point</label>
                                    <input type="text" name="end_point" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Cebu" onChange={handleChange} />
                                    {errors?.end_point && <span className='text-xs text-red-500'>{errors.end_point[0]}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Plate Number</label>
                                    <input type="text" name="plate_number" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="123-098-GB" onChange={handleChange} />
                                    {errors?.plate_number && <span className='text-xs text-red-500'>{errors.plate_number[0]}</span>}
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