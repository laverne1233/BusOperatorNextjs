'use server'

import { signIn } from "next-auth/react"

export async function loginUserWithCredentials(formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    return {
        email,
        password
    }
}