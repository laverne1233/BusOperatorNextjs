import Link from "next/link"
export default function Track() {
    return (
        <>
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Bus</p>
                <p className="text-base">Track Buses</p>
            </div>
            <div className="flex flex-row w-full">
                <Link href="/bus-operator/buses" className="w-full text-center">
                    <p>Bus</p>
                    <hr className="border border-gray-300 w-full" style={{ height: '1px' }} />
                </Link>
                <Link href="/bus-operator/buses/track" className="w-full text-center">
                    <p>Bus Track</p>
                    <hr className="border border-gray-500 w-full" style={{ height: '2px' }} />
                </Link>
            </div>
        </>
    )
}