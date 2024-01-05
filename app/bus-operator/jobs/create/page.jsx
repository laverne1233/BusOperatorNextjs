'use client'

import FormInputGroup from "@/components/FormInputGroup"
import Heading from "@/components/Heading"
import TextAreaGroup from "@/components/TextAreaGroup"
import { useJobStore, useUserStore } from "@/store"
import { redirectToRoute } from "@/utils/routing"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function JobCreate() {
    const jobStore = useJobStore()
    const userStore = useUserStore()
    const [organization, setOrganization] = useState({})

    useEffect(() => {
        jobStore.reset()
        fetch(process.env.BE_URL + `/auth/me`, {
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
                setOrganization(result.data.organization)
            })
            .catch(error => console.error(error.message))
    }, [])

    const handleChangeEvent = (e) => {
        jobStore.setJob({ [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="flex flex-row w-full">
                <Heading title={'Manage Jobs'} description={'Create new job opening'} />
                <div className="ml-auto flex flex-row p-8 gap-4">
                    <Link href={redirectToRoute('/jobs')} className="bg-white-500 text-black border border-black rounded-lg py-4 px-8  w-full">Cancel</Link>
                    <button className="bg-purple-default text-white border border-white rounded-lg py-1 px-10  w-full">Save</button>
                </div>
            </div>
            <TopForm companyName={organization.company_name} companyAddress={organization.company_address} onChangeEvent={handleChangeEvent} />
            <Tabs companyDescription={organization.company_description} onChangeEvent={handleChangeEvent} />
        </>
    )
}

const TopForm = ({ companyName, companyAddress, onChangeEvent }) => {
    const fields = [
        {
            label: 'Title',
            tagFor: 'title',
            type: 'text',
            placeholder: '',
        },
        {
            label: 'Company',
            tagFor: 'company',
            type: 'text',
            placeholder: '',
            defaultValue: companyName
        },
        {
            label: 'Company Address',
            tagFor: 'company_address',
            type: 'text',
            placeholder: '',
            defaultValue: companyAddress
        },
        {
            label: 'Salary',
            tagFor: 'salary',
            type: 'text',
            placeholder: '',
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
                    </section>
                </div>
            </div>
        </>
    )
}

const Tabs = ({ companyDescription, onChangeEvent }) => {
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

            <div className="mt-3 p-4 w-full overflow-x-auto overflow-y-auto" style={{ height: 'calc(100vh - 60%)' }}>
                <div id="horizontal-alignment-1" role="tabpanel" aria-labelledby="horizontal-alignment-item-1 flex flex-col gap-8" >
                    <TextAreaGroup
                        label={'Job Highlights'}
                        tagFor={'job_highlights'}
                        rows={5}
                        onChangeEvent={onChangeEvent}
                    />
                    <TextAreaGroup
                        label={'Qualifications'}
                        tagFor={'qualification'}
                        rows={5}
                        onChangeEvent={onChangeEvent}
                    />
                    <TextAreaGroup
                        label={'How to apply'}
                        tagFor={'how_to_apply'}
                        rows={5}
                        onChangeEvent={onChangeEvent}
                    />
                </div>
                <div id="horizontal-alignment-2" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-2">
                    <TextAreaGroup
                        label={''}
                        tagFor={'about_the_company'}
                        rows={12}
                        defaultValue={companyDescription}
                        onChangeEvent={onChangeEvent}
                    >
                    </TextAreaGroup>
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



