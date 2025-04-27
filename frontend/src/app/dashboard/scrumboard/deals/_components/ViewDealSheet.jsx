"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, DollarSign, Calendar, User, Briefcase, Tag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
export default function ViewDealSheet({ deal, open, onOpenChange }) {

    useEffect(() => {
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [open]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px] p-6 overflow-y-auto">
                <SheetHeader className="space-y-4">
                    <SheetTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-primary" />
                        {deal.title}
                    </SheetTitle>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={`
                                px-3 py-1 text-xs font-semibold rounded-full
                                ${deal.status === 'won'
                                ? 'bg-green-100 text-green-700 border-green-300'
                                : deal.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                    : 'bg-red-100 text-red-700 border-red-300'
                            }
                            `}
                        >
                            {deal.status}
                        </Badge>
                        <Badge
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border-blue-300"
                        >
                            <DollarSign className="w-3 h-3 mr-1" />
                            {deal.amount}
                        </Badge>
                    </div>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    <Separator className="my-4" />

                    {/* Description Section */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-500" />
                            Description
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {deal.description || 'No description provided'}
                            </p>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-500" />
                            Company Details
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={deal.client_company?.image || "/company-placeholder.svg"} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {deal.client_company?.name?.charAt(0) || 'C'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">
                                    {deal.client_company?.name || 'Unknown Company'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {deal.client_company?.industry || 'Industry not specified'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dates Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                Created At
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {new Date(deal.created_at).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Owner Section */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            Assigned to
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-gray-200">
                                <AvatarImage src={deal.agent?.image || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {deal.agent?.firstname?.charAt(0) || 'O'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">
                                    {`${deal.agent?.firstname} ${deal.agent?.lastname}` || 'Unknown Agent'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {deal.agent?.email || 'No email provided'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Additional Metadata */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">Deal Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Deal ID:</span>
                                <p className="font-medium text-gray-700">{deal.id}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Pipeline Stage:</span>
                                <p className="font-medium text-gray-700">{deal.status}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Last Updated:</span>
                                <p className="font-medium text-gray-700">
                                    {new Date(deal.updated_at).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}