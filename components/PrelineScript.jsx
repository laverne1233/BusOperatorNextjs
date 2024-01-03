"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import "preline/preline";

export default function PrelineScript() {
    const path = usePathname();

    useEffect(() => {
        setTimeout(() => {
            import("preline/preline");
        }, 1000)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.HSStaticMethods.autoInit();
        }, 1000);
    }, [path]);

    return null;
}