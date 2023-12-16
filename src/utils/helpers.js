import { AppTitle } from "./constants";

export const setAppTitle = (content) => {
    return `${AppTitle} - ${content}`;
}

export const dataFetcher = async (url, options) => {
    const response = await fetch(url, options)
    return await response.json()
}