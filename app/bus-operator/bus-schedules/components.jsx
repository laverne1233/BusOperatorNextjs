import { useEffect, useRef, useState } from "react"
import { useUserStore } from "@/store"
import { z } from 'zod'

export const ModalCreate = ({ setRender }) => {
    const modalCloseBtnRef = useRef(null)
    const token = useUserStore((state) => state.user?.token)
    const initialState = {
        bus_id: '',
        driver_id: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
    }
    const [busSchedule, setBusSchedule] = useState(initialState)
    const [buses, setBuses] = useState([])
    const [drivers, setDrivers] = useState([])
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setBusSchedule(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        fetch(process.env.BE_URL + '/employees?type=bus_driver', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => setDrivers(result.data))
            .catch(error => console.error(error.message))

        fetch(process.env.BE_URL + '/buses', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => setBuses(result.data))
            .catch(error => console.error(error.message))
    }, [])

    console.log(drivers);

    const handleSubmit = async () => {

        // const BusSchema = z.object({
        //     id_number: z.string().min(1, { message: 'Should not be empty' }).refine((num) => num >= 0, { message: 'Should be a non-negative number' }),
        //     bus_code: z.string().min(1, { message: 'Should not be empty' }),
        //     start_point: z.string().min(1, { message: 'Should not be empty' }),
        //     end_point: z.string().min(1, { message: 'Should not be empty' }),
        //     plate_number: z.string().min(1, { message: 'Should not be empty' }),
        // });

        // const result = BusSchema.safeParse(bus)

        // if (!result.success) {
        //     setErrors(result.error.flatten().fieldErrors)
        //     return
        // }

        const response = await fetch(process.env.BE_URL + '/bus-schedules', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(busSchedule)
        })
        const responseData = await response.json()

        setBusSchedule(initialState)
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
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Driver</label>
                                    <select onChange={handleChange} name="driver_id" id="driver_id" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                        <option value="">Select</option>
                                        {drivers.map(driver => (<option key={driver.id} value={driver.id}>{driver.full_name}</option>))}
                                    </select>

                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Bus</label>
                                    <select onChange={handleChange} name="bus_id" id="bus_id" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                        <option value="">Select</option>
                                        {buses.map(bus => (<option key={bus.id} value={bus.id}>{bus.bus_code + ' - ' + `${bus.start_point} - ${bus.end_point}`}</option>))}
                                    </select>

                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Start Date</label>
                                    <input type="date" name="start_date" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={handleChange} />
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">End Date</label>
                                    <input type="date" name="end_date" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={handleChange} />
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Start Date</label>
                                    <input type="time" name="start_time" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={handleChange} />
                                </div>

                                <div className="relative">
                                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">End Date</label>
                                    <input type="time" name="end_time" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={handleChange} />
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