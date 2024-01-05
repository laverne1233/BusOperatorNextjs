'use client'
import Heading from "@/components/Heading";
import { useState } from "react";

export default function JobShow({ param }) {

    return (
        <>
            <div className="flex flex-row w-full">
                <Heading title={'Manage Jobs'} description={'Job opening information'} />
                <div className="ml-auto flex p-8 items-end">
                    <div className="hs-dropdown relative inline-flex">
                        <button id="hs-dropdown-custom-icon-trigger" type="button" className="hs-dropdown-toggle flex justify-center items-center w-9 h-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            <svg className="flex-none w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                        </button>

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[10rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-icon-trigger">
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                                Edit
                            </a>
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                                Delete
                            </a>
                        </div>

                        <div className="mt-3 p-4 w-full overflow-x-auto overflow-y-auto" style={{ height: 'calc(100vh - 60%)' }}>
                            <div id="horizontal-alignment-1" role="tabpanel" aria-labelledby="horizontal-alignment-item-1 flex flex-col gap-8" >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
