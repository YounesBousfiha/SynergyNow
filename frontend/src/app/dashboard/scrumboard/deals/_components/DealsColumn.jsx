"use client"

import {Badge} from "../../../../../components/ui/badge";
import {Button} from "../../../../../components/ui/button";
import {Plus} from "lucide-react";
import AddDealSheet from "./AddDealSheet";
import { useState } from 'react';
import {useAuth} from "../../../../../store/useAuth";

export default function DealsColumn({ title, count, children }) {

    const [isOpen, setIsOpen] = useState(false);
    const roleId = useAuth((state) => state.user?.role_id);

    const onAddDeal = () => {
        setIsOpen(true)
    }
    return (
        <>
        <div className="w-[280px] flex-shrink-0">
            <div className="bg-white rounded-md shadow-sm mb-4 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{title}</span>
                    <Badge variant="outline" className="bg-gray-100">
                        {count}
                    </Badge>
                </div>
                { roleId !== 3 && <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-100"
                    onClick={() => onAddDeal()}
                >
                    <Plus size={16}/>
                </Button>}
            </div>
            <div className="space-y-4">{children}</div>
        </div>

        <AddDealSheet
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        />
    </>
    )
}