'use client'

import Link from "next/link"
import { useUserStore } from "@/store"
import { convertTimestamp } from "@/utils/date"
import { useEffect, useState, useRef } from "react"
import { redirectToRoute } from "@/utils/routing"

export default function Jobs() {
    const [search, setSearch] = useState('')
    const [jobs, setJobs] = useState([])
    const userStore = useUserStore()

    useEffect(() => {
        fetch(process.env.BE_URL + '/jobs', {
            headers: {
                Authorization: `Bearer ${userStore.user?.token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => setJobs(result.data))
            .catch(error => console.error(error.message))

    }, [])

    return (
        <>
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Jobs</p>
                <p className="text-base">Post job openings</p>
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
                        <Link href={redirectToRoute('/jobs/create')} className="bg-purple-default text-white p-2 px-8 rounded">New Job Post</Link>
                    </div>
                </div>

                <div className="flex flex-col mt-5" style={{ height: 'calc(100vh - 18rem)' }}>
                    <div className="p-2 overflow-x-auto overflow-y-auto grid grid-cols-3 gap-3" >
                        {jobs.filter((item) => {
                            return item.title.toLowerCase().includes(search.toLowerCase()) ||
                                item.company_name.toLowerCase().includes(search.toLowerCase()) ||
                                item.company_address.toLowerCase().includes(search.toLowerCase()) ||
                                item.salary.toLowerCase().includes(search.toLowerCase()) ||
                                convertTimestamp(item.created_at).toString().includes(search)
                        }).map((item, key) => (
                            <Card
                                key={key}
                                id={item.id}
                                title={item.title}
                                company_name={item.company_name}
                                company_address={item.company_address}
                                salary={item.salary}
                                created_at={item.created_at}
                            />
                        ))
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

const Card = ({ id, title, company_name, company_address, salary, created_at }) => {
    return (
        <>
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] h-48">
                <div className="p-4 md:p-5 flex flex-col h-full">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {title || 'Title'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {company_name || 'Company Name'}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {company_address || 'Company Address'}
                        </p>
                        <p className="text-slate-950 text-sm bg-green-500 p-0.5 ">
                            PHP {salary || '10,000 - 20,000 per Month'}
                        </p>
                    </div>
                    <p className="mt-auto text-gray-500 dark:text-gray-400 text-xs">
                        {convertTimestamp(created_at || "2024-01-01T00:22:57.000000Z")}
                    </p>
                </div>
            </div>
        </>
    )
}