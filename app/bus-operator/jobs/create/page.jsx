'use client'

import Heading from "@/components/Heading"

export default function JobCreate() {
    return (
        <>
            <Heading title={'Manage Jobs'} description={'Create new job opening'} />
            <TopForm />
            <Tabs />
        </>
    )
}

const TopForm = () => {
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
        },
        {
            label: 'Company Address',
            tagFor: 'company_address',
            type: 'text',
            placeholder: '',
        },
        {
            label: 'Salary',
            tagFor: 'salary',
            type: 'number',
            placeholder: '',
        },
    ]
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2 w-full">
                    <section className="flex flex-col gap-3 justify-center w-4/6 p-4">
                        {fields.map((item, key) => (
                            <FormInputGroup key={key} label={item.label} tagFor={item.tagFor} type={item.type} placeholder={item.placeholder} />
                        ))}
                    </section>
                </div>
            </div>
        </>
    )
}

const Tabs = () => {
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
                    />
                    <TextAreaGroup
                        label={'Qualifications'}
                        tagFor={'qualification'}
                        rows={5}
                    />
                    <TextAreaGroup
                        label={'How to apply'}
                        tagFor={'how_to_apply'}
                        rows={5}
                    />
                </div>
                <div id="horizontal-alignment-2" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-2">
                    <p className="text-gray-500 dark:text-gray-400">
                        This is the <em className="font-semibold text-gray-800 dark:text-gray-200">second</em> item's tab body.
                    </p>
                </div>
                <div id="horizontal-alignment-3" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-3">
                    <p className="text-gray-500 dark:text-gray-400">
                        This is the <em className="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
                    </p>
                </div>
            </div>
        </>
    )
}

const FormInputGroup = ({ label, tagFor, type, placeholder, parentClass, labelClass, inputClass }) => {
    return (
        <>
            <div className={parentClass || "flex flex-row gap-2 items-center"}>
                <label htmlFor={tagFor} className={labelClass || "text-base font-bold"}>{label}</label>
                <input type={type} name={tagFor} id="input-label" className={inputClass || "py-3 px-4 ml-auto block w-3/4 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"} placeholder={placeholder} />
            </div>
        </>
    )
}

const TextAreaGroup = ({ label, tagFor, cols, rows, placeholder, parentClass, labelClass, inputClass }) => {
    return (
        <>
            <div className={parentClass || "flex flex-col gap-2"}>
                <label htmlFor={tagFor} className={labelClass || "text-base font-bold"}>{label}</label>
                <textarea
                    name={tagFor}
                    id={tagFor}
                    cols={cols}
                    rows={rows}
                    className={inputClass || "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"}
                ></textarea>
            </div>
        </>
    )
}