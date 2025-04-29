"use client"

import { useEffect } from "react"
export default function ViewQuoteDetails({ open, setOpen, quote }) {


    useEffect(() => {
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [open]);

    return (
        <>
            <h1>View Dialog</h1>
        </>
    );
}

