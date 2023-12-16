import { getServerSession } from "next-auth"

const Page = () => {
    const user = getServerSession()
    console.log(user)
    return (
        <>
            <h1>Sample Dashboard Page</h1>
        </>
    )
}

export default Page