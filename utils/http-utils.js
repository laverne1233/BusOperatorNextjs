import { useUserStore } from "@/store"

export const postFetch = async (uri, data) => {
    const userStore = useUserStore.getState().user

    const response = await fetch(process.env.BE_URL + uri, {
        headers: {
            Authorization: `Bearer ${userStore?.token}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    return await response.json()
}

export const getFetch = async (uri) => {
    const userStore = useUserStore.getState().user
    const response = await fetch(process.env.BE_URL + uri, {
        headers: {
            Authorization: `Bearer ${userStore?.token}`,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    })
    console.log(await response, userStore?.token)
    // return await response.json()
}