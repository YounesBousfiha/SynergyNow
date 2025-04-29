"use client"

import { useEffect } from "react"
import {Button} from "../../../../components/ui/button";
import { FileDown } from 'lucide-react';
import {DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle} from "../../../../components/ui/dialog";
import {Separator} from "../../../../components/ui/separator";
import {quoteService} from "../../../../services/quoteService";
import {toast} from "sonner";
export default function ViewQuoteDetails({ isOpen, setIsOpen, quote }) {


    useEffect(() => {
        if (!isOpen) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [isOpen]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleExportPDF = async (id) => {
        try {
            const response = await quoteService.exportPDF(id);

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `quote-${id}.pdf`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("PDF exported successfully");
        } catch (error) {
            console.error("Error exporting PDF:", error);
            toast.error("Failed to export PDF");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Quote Details</DialogTitle>
                    <DialogDescription>
                        Complete information about the quote and related company
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Company Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">Company Information</h3>
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Company Name</p>
                                <p className="font-medium">{quote?.client_company?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Industry</p>
                                <p className="font-medium">{quote?.client_company?.industry}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{quote?.client_company?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{quote?.client_company?.phone}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">{quote?.client_company?.address}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-500">Website</p>
                                <p className="font-medium">{quote?.client_company?.website}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Deal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">Deal Information</h3>
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Title</p>
                                <p className="font-medium">{quote?.deal?.title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Amount</p>
                                <p className="font-medium">${quote?.deal?.amount}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-medium capitalize">{quote?.deal?.status}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Created Date</p>
                                <p className="font-medium">{formatDate(quote?.deal?.created_at)}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-500">Description</p>
                                <p className="font-medium">{quote?.deal?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                    <Button
                        onClick={() => handleExportPDF(quote.id)}
                        className="flex items-center gap-2"
                    >
                        <FileDown size={16} />
                        Export to PDF
                    </Button>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

