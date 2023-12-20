
'use server'

import { dataFetcher } from "@/utils/helpers"

export async function registerUser(formData) {
    formData.append('is_verified', false)
    formData.append('company_description', '')

}