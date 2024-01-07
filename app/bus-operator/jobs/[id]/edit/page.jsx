'use client'
import FormInputGroup from "@/components/FormInputGroup";
import Heading from "@/components/Heading";
import TextAreaGroup from "@/components/TextAreaGroup";
import { useUserStore } from "@/store";
import { convertTimestamp, greaterThanOrEqualDate } from "@/utils/date";
import { redirectToRoute } from "@/utils/routing";
import { JobSchema } from "@/utils/schemas";
import { validateForm } from "@/utils/validator";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JobShow({ params }) {
    const userStore = useUserStore()
    const [job, setJob] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetch(process.env.BE_URL + `/jobs/${params.id}`, {
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
                console.log(result.data)
                setJob(result.data)
            })
            .catch(error => console.error(error.message))
    }, [])

    const handleChange = (e) => {
        setJob(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdateJob = async () => {
        const validator = validateForm(JobSchema, job)

        if (!validator.success) {
            setErrors(validator.error.flatten().fieldErrors)
            return
        }

        const response = await fetch(process.env.BE_URL + `/jobs/${params.id}`, {
            headers: {
                Authorization: `Bearer ${userStore.user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                '_method': 'PUT',
                ...job
            })
        })
        const responseData = await response.json()

        window.location.replace(redirectToRoute('/jobs'))
    }

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
                                Save
                            </a>
                            <Link type="button" href={redirectToRoute('/jobs')} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700 w-full">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <TopForm job={job} onchangeEvent={handleChange} />
            <Tabs job={job} handleChange={handleChange} />

        </>
    )
}

const TopForm = ({ job, onChangeEvent }) => {
    const fields = [
        {
            label: 'Title',
            tagFor: 'title',
            type: 'text',
            placeholder: '',
            defaultValue: job?.title
        },
        {
            label: 'Company',
            tagFor: 'company',
            type: 'text',
            placeholder: '',
            defaultValue: job?.company_name
        },
        {
            label: 'Company Address',
            tagFor: 'company_address',
            type: 'text',
            placeholder: '',
            defaultValue: job?.company_address
        },
        {
            label: 'Salary',
            tagFor: 'salary',
            type: 'text',
            defaultValue: job?.salary,
        },
    ]
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2 w-full">
                    <section className="flex flex-col gap-3 justify-center w-4/6 p-4">
                        {fields.map((item, key) => (
                            <FormInputGroup
                                key={key}
                                label={item.label}
                                tagFor={item.tagFor}
                                type={item.type}
                                placeholder={item.placeholder}
                                defaultValue={item?.defaultValue}
                                onchangeEvent={onChangeEvent}
                            />
                        ))}
                        <p className="text-xs mt-5">Last Update: {greaterThanOrEqualDate(job?.created_at, job?.updated_at) ? convertTimestamp(job?.created_at) : convertTimestamp(job?.updated_at)}</p>

                    </section>
                </div>
            </div>
        </>
    )
}


const Tabs = ({ job, handleChange }) => {
    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-0.5 flex justify-center space-x-6" aria-label="Tabs" role="tablist">
                    <button type="button" className="w-full justify-center hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active" id="horizontal-alignment-item-1" data-hs-tab="#horizontal-alignment-1" aria-controls="horizontal-alignment-1" role="tab">
                        Job Description
                    </button>
                    <button type="button" className="w-full justify-center hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="horizontal-alignment-item-2" data-hs-tab="#horizontal-alignment-2" aria-controls="horizontal-alignment-2" role="tab">
                        About the Company
                    </button>
                    <button type="button" className="w-full justify-center hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="horizontal-alignment-item-3" data-hs-tab="#horizontal-alignment-3" aria-controls="horizontal-alignment-3" role="tab">
                        Questions
                    </button>
                </nav>
            </div>

            <div className="mt-3 p-4 w-full overflow-x-auto overflow-y-auto" style={{ height: 'calc(100vh - 63%)' }}>
                <div id="horizontal-alignment-1" role="tabpanel" aria-labelledby="horizontal-alignment-item-1" className="flex flex-col gap-5">
                    <TextAreaGroup
                        label={'Job Highlights'}
                        tagFor={'job_highlights'}
                        rows={5}
                        onChangeEvent={handleChange}
                        defaultValue={job?.job_highlights}
                    />
                    <TextAreaGroup
                        label={'Qualifications'}
                        tagFor={'qualification'}
                        rows={5}
                        onChangeEvent={handleChange}
                        defaultValue={job?.qualifications}
                    />
                    <TextAreaGroup
                        label={'How to apply'}
                        tagFor={'how_to_apply'}
                        rows={5}
                        onChangeEvent={handleChange}
                        defaultValue={job?.how_to_apply}
                    />
                </div>
                <div id="horizontal-alignment-2" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-2">
                    <TextAreaGroup
                        label={''}
                        tagFor={'about_the_company'}
                        onChangeEvent={handleChange}
                        rows={12}
                        defaultValue={job?.about_the_company}
                    />
                </div>
                <div id="horizontal-alignment-3" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-3">
                    <p className="text-gray-500 dark:text-gray-400">
                        Coming soon.
                    </p>
                </div>
            </div>
        </>
    )
}
