import { apiUri } from "./constants"
import { dataFetcher } from "./helpers"

export const verifyUserRole = async (email) => {
    const url = process.env.WRAPPER_URL + apiUri['verify-user-role']

    return await dataFetcher(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "role": 'bus-operator'
        })
    })
}

export const getBus = async () => {
    const url = process.env.WRAPPER_URL + apiUri['bus-list']

    const response = await dataFetcher(url, [])
    return response
}