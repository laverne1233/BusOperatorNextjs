export const convertTimestamp = (timestamp) => {
    const date = new Date(Date.parse(timestamp));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`
}

export const greaterThanDate = (date1, date2) => {
    return (new Date(date1)) > (new Date(date2))
}

export const greaterThanOrEqualDate = (date1, date2) => {
    return (new Date(date1)) >= (new Date(date2))
}

export const lessThanDate = (date1, date2) => {
    return (new Date(date1)) < (new Date(date2))
}

export const lessThanOrEqualDate = (date1, date2) => {
    return (new Date(date1)) <= (new Date(date2))
}
