import Link from "next/link"
export default function Status() {
    return (
        <>
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Employee</p>
                <p className="text-base">Manage your employee’s job status</p>
            </div>
            <div className="flex flex-row w-full">
                <Link href="/bus-operator/employee" className="w-full text-center">
                    <p>Employee</p>
                    <hr className="border border-gray-300 w-full" style={{ height: '1px' }} />
                </Link>
                <Link href="/bus-operator/employee/status" className="w-full text-center">
                    <p>Employee's Status</p>
                    <hr className="border border-gray-500 w-full" style={{ height: '2px' }} />
                </Link>
                <Link href="/bus-operator/employee/account" className="w-full text-center">
                    <p>User's Account</p>
                    <hr className="border border-gray-300 w-full" style={{ height: '1px' }} />
                </Link>
            </div>
        </>
    )
}