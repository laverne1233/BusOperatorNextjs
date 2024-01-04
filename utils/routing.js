export const redirectToRoute = (uri, isAuthenticated = true) => {
    return isAuthenticated ? `/bus-operator/${uri}` : uri
}