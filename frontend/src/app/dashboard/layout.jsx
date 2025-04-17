"use client"
import SideBar from "./_components/SideBar";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Layout({ children }) {

    return (
        <div className="flex min-h-screen bg-[#f3f3f6]">
            <Toaster />
            <SideBar />
            {children}
        </div>
    );
}