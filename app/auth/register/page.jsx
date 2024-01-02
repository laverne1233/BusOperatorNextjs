'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { create } from 'zustand';
import { z } from 'zod';

const useOrganizationStore = create((set) => ({
    companyName: '',
    companyAddress: '',
    companyDescription: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',

    setCompanyInformation: ({ companyName, companyAddress, companyDescription }) => set((prev) => ({
        ...prev,
        companyName: companyName,
        companyAddress: companyAddress,
        companyDescription: companyDescription
    })),
    setCompanyName: (companyName) => set(() => ({ companyName: companyName })),
    setCompanyAddress: (companyAddress) => set(() => ({ companyAddress: companyAddress })),
    setCompanyDescription: (companyDescription) => set(() => ({ companyDescription: companyDescription })),

    setUserInformation: ({ fullName, email, phoneNumber, password }) => set((prev) => ({
        ...prev,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    })),
    setFullName: (fullName) => set(() => ({ fullName: fullName })),
    setEmail: (email) => set(() => ({ email: email })),
    setPhoneNumber: (phoneNumber) => set(() => ({ phoneNumber: phoneNumber })),
    setPassword: (password) => set(() => ({ password: password })),
}))

const useStepStore = create((set) => ({
    step: 1,
    increaseStep: () => set((state) => ({ step: state.step + 1 })),
    decreaseStep: () => set((state) => ({ step: state.step - 1 }))
}))

const CompanyInformation = () => {
    const organization = useOrganizationStore()
    const [name, setName] = useState(organization.companyName)
    const [address, setAddress] = useState(organization.companyAddress)
    const [description, setDescription] = useState(organization.companyDescription)
    const [errors, setErrors] = useState({})

    const increaseStep = useStepStore((state) => state.increaseStep)

    const CompanyInfoSchema = z.object({
        name: z.string().nonempty(),
        address: z.string().nonempty(),
        description: z.optional(z.string())
    })

    const nextStep = () => {
        const result = CompanyInfoSchema.safeParse({
            name: name,
            address: address,
            description: description
        })

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            return
        }

        organization.setCompanyInformation({
            companyName: name,
            companyAddress: address,
            companyDescription: description
        })
        increaseStep()
    }
    return (
        <div className='flex flex-col gap-5'>
            <div>
                <input type="text" id="hs-trailing-icon" name="hs-trailing-icon" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Company Name" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                {errors?.name && <span className='text-xs text-red-500'>{errors.name[0]}</span>}
            </div>

            <div>
                <input type="text" id="hs-trailing-icon" name="hs-trailing-icon" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Company Address" onChange={(e) => setAddress(e.target.value)} defaultValue={address} />
                {errors?.address && <span className='text-sm text-red-500'>{errors.address[0]}</span>}
            </div>

            <div>
                <textarea className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows="5" placeholder="Company Description" style={{ resize: 'none' }} onChange={(e) => setDescription(e.target.value)} defaultValue={description}></textarea>
                {errors?.description && <span className='text-sm text-red-500'>{errors.description[0]}</span>}
            </div>
            <button type='button' className='bg-purple-default text-white rounded-lg py-2 px-4 mt-4 w-full' onClick={nextStep}>Continue</button>

            <div className='flex flex-row gap-1 justify-center w-full'>
                <p>Already have an account?</p>
                <Link href='/auth/login' className='text-green-600'>Sign In</Link>
            </div>
        </div>
    )
}

const UserInformation = () => {
    const organization = useOrganizationStore()
    const [name, setName] = useState(organization.fullName)
    const [email, setEmail] = useState(organization.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(organization.phoneNumber)
    const decreaseStep = useStepStore((state) => state.decreaseStep)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({})


    const submitForm = () => {
        const UserSchema = z.object({
            name: z.string().nonempty(),
            email: z.string().email().nonempty(),
            password: z.string().nonempty(),
            phoneNumber: z.string().nonempty()
        })

        const user = {
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        }

        const result = UserSchema.safeParse(user)

        if (password != confirmPassword) {
            setErrors((prev) => ({ ...prev, password: ['Password does not match'] }))
            return
        }

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            return
        }

        organization.setUserInformation(user)
    }

    return (
        <div className='flex flex-col gap-5'>
            <div>
                <input type="text" id="full_name" name="full_name" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                {errors?.name && <span className='text-xs text-red-500'>{errors.name[0]}</span>}
            </div>

            <div>
                <input type="email" id="email" name="email" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                {errors?.email && <span className='text-xs text-red-500'>{errors.email[0]}</span>}
            </div>

            <div>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} id="password" name="password" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button
                        className="absolute inset-y-0 end-0 flex items-center pointer-events-auto z-20 pr-4"
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                        {showPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        }
                    </button>
                </div>
                {errors?.password && <span className='text-sm text-red-500'>{errors.password[0]}</span>}
            </div>


            <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button
                    className="absolute inset-y-0 end-0 flex items-center pointer-events-auto z-20 pr-4"
                    onClick={() => setShowConfirmPassword((showPassword) => !showPassword)}
                >
                    {showConfirmPassword ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                </button>
            </div>

            <div>
                <input type="number" id="phoneNumber" name="phoneNumber" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Contact Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                {errors?.phoneNumber && <span className='text-sm text-red-500'>{errors.phoneNumber[0]}</span>}
            </div>

            <div className='flex flex-col gap-2'>
                <button type='button' className='bg-white-500 text-black border border-black rounded-lg py-2 px-4  w-full' onClick={decreaseStep}>Back</button>
                <button type='button' className='bg-purple-default text-white rounded-lg py-2 px-4  w-full' onClick={submitForm}>Submit</button>
            </div>

        </div>
    )
}


const Login = () => {
    const step = useStepStore((state) => state.step)

    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <div className="bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-5 w-4/6">
                    <div className='flex flex-col gap-10'>
                        <section className='flex flex-col items-center'>
                            <div className=" overflow-y-auto p-4 md:p-5 ">
                                <div className="rounded-full bg-gray-700 text-white flex items-center justify-center w-16 h-16">
                                    <span className="text-2xl">BY</span>
                                </div>
                            </div>
                            <h2 className="text-2xl text-center mt-1">Welcome to BusYan</h2>
                            <p className="text-lg text-center">Create your account</p>
                        </section>
                        <section className='flex flex-col gap-4 mx-5 px-5'>
                            {step == 1 ?
                                <CompanyInformation />
                                :
                                <UserInformation />
                            }
                        </section>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;