
import { z } from 'zod'

export const JobSchema = z.object({
    title: z.string().min(1, { message: 'Should not be empty' }),
    company_name: z.string().min(1, { message: 'Should not be empty' }),
    company_address: z.string().min(1, { message: 'Should not be empty' }),
    salary: z.string().min(1, { message: 'Should not be empty' }),
    job_highlights: z.string().min(1, { message: 'Should not be empty' }),
    qualifications: z.string().min(1, { message: 'Should not be empty' }),
    how_to_apply: z.string().min(1, { message: 'Should not be empty' }),
    about_the_company: z.string().min(1, { message: 'Should not be empty' }),
});