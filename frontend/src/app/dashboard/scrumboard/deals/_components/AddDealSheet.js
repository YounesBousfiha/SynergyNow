"use client"

import {Sheet, SheetHeader, SheetTitle, SheetDescription, SheetContent} from '../../../../../components/ui/sheet';

export default function AddDealSheet({ isOpen, onOpenChange }) {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-[450px]">
                <SheetHeader>
                    <SheetTitle>Add New Deal</SheetTitle>
                    <SheetDescription>
                        Create a new deal and add it to the board.
                    </SheetDescription>
                </SheetHeader>
                {/* Add your form fields here */}
            </SheetContent>
        </Sheet>
    );
}