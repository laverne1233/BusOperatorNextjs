import { getServerSession } from "next-auth"

const Page = () => {
    const user = getServerSession()
    return (
        <>
            <h1>Sample Dashboard Page</h1>
        </>
    )
}

export default Page