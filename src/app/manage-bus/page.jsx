"use client"

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import {
    Heading,
    Box,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";
import { getBus } from "@/utils/api-call";
import { useSession } from "next-auth/react";

const Table = dynamic(() => import("@/components/CustomTable"), {
    ssr: false
});


const Page = () => {
    const user = useSession()
    console.log(user)
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])

    const headers = ['ID No', 'Bus Code', 'Start Point', 'End Point', 'Plate Number', '']

    useEffect(() => {
        getBus().then((items) => {
            setData(items.data)
        }).catch(e => console.error(e.message))
    }, []);

    const showAlert = (id_number) => {
        alert('sample:' + id_number)
    }
    return (
        <>
            <Heading m={5}>Manage Bus</Heading>
            <Box marginTop={4} >
                <Tabs isFitted >
                    <TabList>
                        <Tab>Bus</Tab>
                        <Tab>Bus Tracking</Tab>
                    </TabList>

                    <TabPanels p={3}>
                        <TabPanel marginTop={5}>
                            <Table headers={headers} data={data}  >
                                <>
                                    {data.map((item, key) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                {item.id_number}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                {item.bus_code}
                                            </th>

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900" >
                                                {item.start_point}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900" >
                                                {item.end_point}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900" >
                                                {item.plate_number}
                                            </th>

                                            <th key={item.id}>
                                                <button onClick={() => showAlert(item.id)}>Show</button>
                                            </th>
                                        </tr>
                                    ))
                                    }
                                </>
                            </Table>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
};

export default Page;
