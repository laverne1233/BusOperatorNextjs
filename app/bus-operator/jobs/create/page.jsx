'use client'

export default function JobCreate() {
    return (
        <>
            hi create
            <DropZoneComponent />
        </>
    )
}

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const DropZoneComponent = () => {
    const [uploadedImage, setUploadedImage] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
        };

        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div className="bg-white rounded-lg p-8 text-center">
            <div
                {...getRootProps()}
                className={`border-dashed border-4 border-gray-200 py-12 w-full ${isDragActive ? 'bg-gray-100' : ''
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
            {uploadedImage && (
                <div className="mt-4">
                    <Image src={uploadedImage} alt="Uploaded Image" width={200} height={200} />
                </div>
            )}
        </div>
    );
};