'use client'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { database, app } from "@/firebase";
import { ref, onValue, off } from "firebase/database";


const containerStyle = {
    width: '100%',
    height: '60%'
};

const center = {
    lat: 10.3157,
    lng: 123.8854
};

export default function Track() {
    const [data, setData] = useState([])
    const [bus, setBus] = useState()
    const dataRef = ref(database, 'LiveDrivers')

    useEffect(() => {
        const onDataChange = (snapshot) => {
            const result = snapshot.val()
            const mappedResult = Object.entries(result).map((value, key) => {
                return {
                    id: value[0],
                    ...value[1]
                }
            })
            setData(mappedResult);
        };

        onValue(dataRef, onDataChange)

        return () => {
            off(dataRef, onDataChange)
        };
    }, []);

    return (
        <>
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">Manage Bus</p>
                <p className="text-base">Track Buses</p>
            </div>
            <div className="flex flex-row w-full mb-4">
                <Link href="/bus-operator/buses" className="w-full text-center">
                    <p>Bus</p>
                    <hr className="border border-gray-300 w-full" style={{ height: '1px' }} />
                </Link>
                <Link href="/bus-operator/buses/track" className="w-full text-center">
                    <p>Bus Track</p>
                    <hr className="border border-gray-500 w-full" style={{ height: '2px' }} />
                </Link>
            </div>

            <LoadScript googleMapsApiKey="AIzaSyC0haBF8csfumcV-_7_lKnZ8bvm4urxc_s">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {data.map((item) => <Marker key={item.id} position={{ lat: item.lattitude, lng: item.longitude }} label={item.busCode + `  (${item.plateNumber})`} />)}
                </GoogleMap>
            </LoadScript>
        </>
    )
}