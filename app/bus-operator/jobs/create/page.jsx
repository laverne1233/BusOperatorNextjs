'use client'

export default function JobCreate() {
    return (
        <>
            <Heading title={'Manage Jobs'} description={'Create new job opening'} />
            <DropZoneComponent />
        </>
    )
}


import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Heading from '@/components/Heading';

const DropZoneComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="App">
            <input type="file" onChange={handleImageChange} />
            {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '300px', height: '300px' }} />}
        </div>
    );
};