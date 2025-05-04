"use client"

import {useEffect, useState} from "react"
import Image from "next/image"
import {
    Search,
    Filter,
    ChevronDown,
    Eye,
    X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Badge } from "../../../../components/ui/badge"
import { Card, CardContent } from "../../../../components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../../../../components/ui/dialog"
import { Separator } from "../../../../components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import {getintouchService} from "../../../../services/getintouchService";

export default function CustomerMessagesPage() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function FetchData() {
            try {
                setIsLoading(true);
                const response = await getintouchService.all();
                console.log("Hello: ", response.data);

                if(response.status === 200) {
                    setCustomers(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        FetchData();
    }, []);

    // Filter customers based on search query and status filter
    const filteredCustomers = customers.filter((customer) => {

            return searchQuery === "" ||
            `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.message.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const openCustomerDetail = (customer) => {
        setSelectedCustomer(customer)
        setIsDetailModalOpen(true)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="flex min-h-screen bg-[#f3f3f6]">

            {/* Main Content */}
            <div className="flex-1">

                {/* Content */}
                <main className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Customer Messages</h1>
                        <p className="text-gray-500">View and manage customer messages and AI responses</p>
                    </div>

                    {/* Filters and Search */}
                    <div className="flex justify-between items-center mb-6">

                        <div className="relative w-[300px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                className="pl-10"
                                placeholder="Search by name, email, or message..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Customer Messages Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                                        </TableRow>
                                    ) : filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="font-medium">
                                                            {customer.firstname} {customer.lastname}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] truncate">{customer.message}</div>
                                            </TableCell>
                                            <TableCell>{formatDate(customer.created_at)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="flex items-center gap-1"
                                                    onClick={() => openCustomerDetail(customer)}
                                                >
                                                    <Eye size={16} />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* Customer Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="sm:max-w-[700px]">
                    {selectedCustomer && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Customer Message Details</DialogTitle>
                                <DialogDescription>
                                    View complete message and AI response for {selectedCustomer.firstName} {selectedCustomer.lastName}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-6 py-4">
                                {/* Customer Information */}
                                <div className="flex items-start gap-4">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {selectedCustomer.firstName} {selectedCustomer.lastName}
                                        </h3>
                                        <p className="text-gray-500">{selectedCustomer.email}</p>
                                        <p className="text-sm text-gray-500 mt-1">Submitted on {formatDate(selectedCustomer.created_at)}</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Customer Message */}
                                <div>
                                    <h4 className="font-medium mb-2">Customer Message</h4>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <p>{selectedCustomer.message}</p>
                                    </div>
                                </div>

                                {/* AI Response */}
                                <div>
                                    <h4 className="font-medium mb-2">AI Response</h4>
                                    <div className="bg-[#06ae6f]/10 p-4 rounded-md">
                                        <p>{selectedCustomer.AIResponse}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <DialogClose asChild>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <X size={16} />
                                        Close
                                    </Button>
                                </DialogClose>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
