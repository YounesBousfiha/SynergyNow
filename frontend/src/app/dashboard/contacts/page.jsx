"use client"
import Link from "next/link"
import { LayoutDashboard, Kanban, Users, Building2, FileText, MessageSquare, Crown, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { useSearchParams } from "next/navigation";

export default function CustomersPage() {

    const params = useSearchParams();
    const company = params.get('company');

    console.log("Company ID: ", company);
    return (
            <div className="flex-1">
                {/* Top Bar */}
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-end px-6">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                </header>

                {/* Content */}
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">All Customers</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input className="pl-10 w-[300px]" placeholder="Search" />
                        </div>
                    </div>

                    {/* Customers Table */}
                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Customer Name</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Company</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Phone Number</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Email</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Country</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <CustomerRow
                                    name="Jane Cooper"
                                    company="Microsoft"
                                    phone="(225) 555-0118"
                                    email="jane@microsoft.com"
                                    country="United States"
                                    status="Active"
                                />
                                <CustomerRow
                                    name="Floyd Miles"
                                    company="Yahoo"
                                    phone="(205) 555-0100"
                                    email="floyd@yahoo.com"
                                    country="Kiribati"
                                    status="Inactive"
                                />
                                <CustomerRow
                                    name="Ronald Richards"
                                    company="Adobe"
                                    phone="(302) 555-0107"
                                    email="ronald@adobe.com"
                                    country="Palestine"
                                    status="Inactive"
                                />
                                <CustomerRow
                                    name="Marvin McKinney"
                                    company="Tesla"
                                    phone="(252) 555-0126"
                                    email="marvin@tesla.com"
                                    country="Iran"
                                    status="Active"
                                />
                                <CustomerRow
                                    name="Jerome Bell"
                                    company="Google"
                                    phone="(629) 555-0129"
                                    email="jerome@google.com"
                                    country="Réunion"
                                    status="Active"
                                />
                                <CustomerRow
                                    name="Kathryn Murphy"
                                    company="Microsoft"
                                    phone="(406) 555-0120"
                                    email="kathryn@microsoft.com"
                                    country="Curaçao"
                                    status="Active"
                                />
                                <CustomerRow
                                    name="Jacob Jones"
                                    company="Yahoo"
                                    phone="(208) 555-0112"
                                    email="jacob@yahoo.com"
                                    country="Brazil"
                                    status="Active"
                                />
                                <CustomerRow
                                    name="Kristin Watson"
                                    company="Facebook"
                                    phone="(704) 555-0127"
                                    email="kristin@facebook.com"
                                    country="Åland Islands"
                                    status="Inactive"
                                />
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="py-4 px-6 border-t flex items-center justify-center">
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <span className="sr-only">Previous page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 bg-[#06ae6f] text-white border-[#06ae6f]">
                                    1
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    2
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    3
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    4
                                </Button>
                                <span>...</span>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    40
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <span className="sr-only">Next page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    )
}

// Navigation Item Component
function NavItem({
                     href,
                     icon,
                     label,
                     active = false,
}) {
    return (
        <li>
            <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                    active ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
                }`}
            >
                <span className="text-gray-500">{icon}</span>
                <span>{label}</span>
            </Link>
        </li>
    )
}

// Customer Row Component
function CustomerRow({
                         name,
                         company,
                         phone,
                         email,
                         country,
                         status,
}) {
    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{name}</td>
            <td className="py-4 px-6">{company}</td>
            <td className="py-4 px-6">{phone}</td>
            <td className="py-4 px-6">{email}</td>
            <td className="py-4 px-6">{country}</td>
            <td className="py-4 px-6">
                <Badge
                    className={`${status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} font-medium`}
                >
                    {status}
                </Badge>
            </td>
        </tr>
    )
}
