'use client'

import Link from "next/link"
import { useUserStore } from "@/store"
import { useEffect, useState } from "react"

const Modal = () => {
    return (
        <>
            <div id="hs-static-backdrop-modal" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col  border shadow-sm rounded-xl pointer-events-auto bg-gray-200 ">
                        <div className="flex justify-between items-center py-3 px-4 ">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Bus Details
                            </h3>
                            <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-static-backdrop-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <div className="flex flex-col gap-4">

                                <div className="relative">
                                    <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Email</label>
                                    <input type="email" id="input-label" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="you@site.com" />
                                </div>

                                <div className="relative">
                                    <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Email</label>
                                    <input type="email" id="input-label" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="you@site.com" />
                                </div>

                                <div className="relative">
                                    <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Email</label>
                                    <input type="email" id="input-label" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="you@site.com" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Bus() {
    const [search, setSearch] = useState('')
    const [buses, setBuses] = useState([])
    const userStore = useUserStore()

    useEffect(() => {
        fetch(process.env.BE_URL + '/buses', {
            headers: {
                Authorization: `Bearer ${userStore.user?.token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => setBuses(result.data))
            .catch(error => console.error(error.message))
    }, [])

    return (
        <>
            <Modal />
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Bus</p>
                <p className="text-base">Add bus and their routes</p>
            </div>
            <div className="flex flex-row w-full">
                <Link href="/bus-operator/bus" className="w-full text-center">
                    <p>Bus</p>
                    <hr className="border border-gray-500 w-full" style={{ height: '2px' }} />
                </Link>
                <Link href="/bus-operator/bus/track" className="w-full text-center">
                    <p>Bus Track</p>
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
                        <button type="button" className="bg-purple-default text-white p-2 px-8 rounded" data-hs-overlay="#hs-static-backdrop-modal">New Bus</button>
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
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Bus Code</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Start Point</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">start Point</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-gray-400">Plate Number</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-white uppercase dark:text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {buses.filter((item) => {
                                            return item.id_number.toString().includes(search) ||
                                                item.bus_code.toString().includes(search) ||
                                                item.start_point.toLowerCase().includes(search.toLowerCase()) ||
                                                item.end_point.toLowerCase().includes(search.toLowerCase()) ||
                                                item.plate_number.toString().includes(search)
                                        }).map((item, key) => (
                                            <tr key={key}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.id_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.bus_code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.start_point}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.end_point}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.plate_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
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