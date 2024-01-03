
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleCredentialLogin = () => {
        router.push('/')
    }

    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <div className="bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-4 w-1/2 h-5/6">
                    <div className='flex flex-col gap-16'>
                        <section className='flex flex-col items-center'>
                            <div className=" overflow-y-auto p-4 md:p-5 ">
                                <div className="rounded-full bg-gray-700 text-white flex items-center justify-center w-16 h-16">
                                    <span className="text-2xl">BY</span>
                                </div>
                            </div>
                            <h2 className="text-2xl text-center mt-4">Welcome to BusYan</h2>
                            <p className="text-lg text-center">Enter your account</p>
                        </section>
                        <section className='flex flex-col gap-4 mx-5 px-5'>
                            <input type="text" id="email" name="email" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Email" />

                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Password" />
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

                            <Link href='/' className='text-end text-sm'>Forgot Password?</Link>

                            <button type='submit' onClick={handleCredentialLogin} className='bg-purple-default text-white rounded-lg py-2 px-4 mt-4 w-full'>Login</button>

                            <div className='flex flex-row gap-1 justify-center w-full'>
                                <p>Don't have an account?</p>
                                <Link href='/auth/register' className='text-green-600'>Sign Up</Link>
                            </div>

                            <div className='flex flex-row items-center gap-4'>
                                <hr className="border border-gray-500 w-full" style={{ height: '1px' }} />
                                <p className='text-center'>or</p>
                                <hr className="border border-gray-500 w-full" style={{ height: '1px' }} />
                            </div>

                            <button
                                className="border border-blue-500 text-blue-500 rounded-lg py-2 px-4 flex justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="23"
                                    height="23"
                                    viewBox="0 0 48 48"
                                    className="mr-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="45" height="45" viewBox="0 0 48 48">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                </svg>
                                Sign in with Google
                            </button>

                        </section>
                    </div>
                </div>
            </div >
        </>
    );
};

export default LoginForm;