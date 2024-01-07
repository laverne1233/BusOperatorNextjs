import { z } from "zod"

/**
 * Zod custom validator
 * @param {z.ZodObject} schema this is the blueprint on what will be the type and the expected value for the object
 * @param {object} object 
 */
export const validateForm = (schema, object) => {
    return schema.safeParse(object)
}