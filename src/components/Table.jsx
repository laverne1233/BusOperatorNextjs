
'use client'

export default function Table({ headers, data, showEvent }) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((item, index) => (
                            <th scope="col" className="px-6 py-3" key={index}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            (
                                data.map((items, key) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={key}>
                                        {Object.values(items).map((item, key) => (
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={items.id}>
                                                {item}
                                            </th>
                                        ))}

                                        <th key={items.id_number}>
                                            <button onClick={() => showEvent(items.id_number)}>Show</button>
                                        </th>
                                    </tr>
                                ))
                            ) :
                            (
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" colSpan={headers.length}>
                                    No Record
                                </th>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}