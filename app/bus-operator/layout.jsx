'use client'
import React, { useEffect } from 'react'
import Link from "next/link"
import PrelineScript from "@/components/PrelineScript"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store';

export default function BusOperatorLayout({ children }) {
    const { resetUser } = useUserStore()
    const userStore = useUserStore((state) => state.user)

    useEffect(() => {
        if (!Object.keys(userStore).length) {
            window.location.href = '/auth/login'
        }
    })

    const pathname = usePathname()
    const isActiveNav = (uri) => {
        return pathname == '/bus-operator' + uri ?
            "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            :
            "flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-100 rounded-lg hover:bg-gray-100 hover:text-slate-700 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    }

    return (
        <>
            <ProgressBar />
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/6 bg-purple-default h-screen overflow-y-auto scroll-m-px scroll-p-px">
                    <div className="flex flex-col gap-2 p-5">
                        <p className="text-xl font-bold text-white">BusYan</p>
                        <div className="flex flex-col gap-2 items-center mt-8">
                            <img
                                alt="Profile Image"
                                className="object-cover filter opacity-100 w-24 h-24 rounded-full"
                                src="https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-sm font-bold text-white">{userStore?.user?.display_name}</p>
                                <p className="text-xs text-white">Bus Operator</p>
                            </div>
                        </div>

                        <nav className="hs-accordion-group w-full flex flex-col flex-wrap mt-4" data-hs-accordion-always-open>
                            <ul className="space-y-1.5">
                                <li>
                                    <Link className={isActiveNav('')} href="/bus-operator">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActiveNav('/notification')} href="/bus-operator/notification">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                        </svg>

                                        Notification
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActiveNav('/bus')} href="/bus-operator/bus">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                        </svg>

                                        Manage Bus
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActiveNav('/employee')} href="/bus-operator/employee">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>


                                        Manage Employee
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActiveNav('/bus-schedule')} href="/bus-operator/bus-schedule">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                                        Bus Schedule
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActiveNav('/applicant')} href="/bus-operator/applicant">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                        Applicants
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActiveNav('/profile')} href="/bus-operator/profile">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        Profile
                                    </Link>
                                </li>

                                <hr className="border border-gray-500 w-full" />

                                <li>
                                    <button type='button' className={isActiveNav('/logout')} onClick={resetUser}>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="w-full md:w-5/6 border border-8 border-purple-default">
                    {children}
                </div>
            </div>
            <PrelineScript />

        </>
    )
}