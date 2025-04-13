import Link from "next/link"
import {
    Plus,
    Search,
    Eye,
    PenSquare,
    Trash2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"

export default function QuotesPage() {
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
                        <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90 flex items-center gap-2">
                            <Plus size={18} />
                            Add new Quote
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input className="pl-10 w-[300px]" placeholder="Search" />
                        </div>
                    </div>

                    {/* Quotes Table */}
                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b text-gray-500 text-sm">
                                    <th className="text-left py-4 px-6 font-medium">Title</th>
                                    <th className="text-left py-4 px-6 font-medium">Company</th>
                                    <th className="text-left py-4 px-6 font-medium">Total Amount</th>
                                    <th className="text-left py-4 px-6 font-medium">Stage</th>
                                    <th className="text-left py-4 px-6 font-medium">Created_at</th>
                                    <th className="text-left py-4 px-6 font-medium">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Sent"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Draft"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Accepted"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Sent"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Sent"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Sent"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Accepted"
                                    date="01/01/2024 12:00A.M"
                                />
                                <QuoteRow
                                    title="Jane Cooper"
                                    company="Microsoft"
                                    amount="$7,103.60"
                                    stage="Sent"
                                    date="01/01/2024 12:00A.M"
                                />
                                </tbody>
                            </table>
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

// Quote Row Component
function QuoteRow({
                      title,
                      company,
                      amount,
                      stage,
                      date,
}) {
    const getStageBadge = (stage) => {
        switch (stage) {
            case "Sent":
                return <Badge className="bg-[#a8e6cf] text-[#296c5c] font-medium">{stage}</Badge>
            case "Draft":
                return <Badge className="bg-blue-100 text-blue-800 font-medium border border-blue-200">{stage}</Badge>
            case "Accepted":
                return <Badge className="bg-green-100 text-green-800 font-medium">{stage}</Badge>
            default:
                return <Badge>{stage}</Badge>
        }
    }

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{title}</td>
            <td className="py-4 px-6">{company}</td>
            <td className="py-4 px-6">{amount}</td>
            <td className="py-4 px-6">{getStageBadge(stage)}</td>
            <td className="py-4 px-6">{date}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Eye size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <PenSquare size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 size={18} />
                    </Button>
                </div>
            </td>
        </tr>
    )
}
