import Link from "next/link"
import Image from "next/image"
import {
    LayoutDashboard,
    Kanban,
    Users,
    Building2,
    FileText,
    MessageSquare,
    Crown,
    Plus,
    Search,
    MoreHorizontal,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { AvatarGroup } from "../../../components/ui/avatar"

export default function CompaniesPage() {
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
                            Add new Company
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input className="pl-10 w-[300px]" placeholder="Search..." />
                        </div>
                    </div>

                    {/* Companies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CompanyCard logo="/placeholder.svg?height=50&width=50" name="The Company" amount="127,345" logoType="ge" />
                        <CompanyCard logo="/placeholder.svg?height=50&width=50" name="Intel" amount="127,345" logoType="intel" />
                        <CompanyCard
                            logo="/placeholder.svg?height=50&width=50"
                            name="The Company"
                            amount="127,345"
                            logoType="apple"
                        />
                        <CompanyCard
                            logo="/placeholder.svg?height=50&width=50"
                            name="The Company"
                            amount="127,345"
                            logoType="ibm"
                        />
                        <CompanyCard
                            logo="/placeholder.svg?height=50&width=50"
                            name="The Company"
                            amount="127,345"
                            logoType="target"
                        />
                        <CompanyCard
                            logo="/placeholder.svg?height=50&width=50"
                            name="The Company"
                            amount="127,345"
                            logoType="google"
                        />
                        <CompanyCard
                            logo="/placeholder.svg?height=50&width=50"
                            name="The Company"
                            amount="127,345"
                            logoType="intel"
                        />
                        <CompanyCard
                            logo="/placeholder.svg?height=50&width=50"
                            name="The Company"
                            amount="127,345"
                            logoType="google"
                        />
                        <CompanyCard logo="/placeholder.svg?height=50&width=50" name="The Company" amount="127,345" logoType="ge" />
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

// Company Card Component
function CompanyCard({
                         logo,
                         name,
                         amount,
                         logoType,
}) {
    // Function to get logo background color based on logo type
    const getLogoBg = (type) => {
        switch (type) {
            case "ge":
                return "bg-blue-50"
            case "intel":
                return "bg-blue-50"
            case "apple":
                return "bg-gray-50"
            case "ibm":
                return "bg-blue-50"
            case "target":
                return "bg-red-50"
            case "google":
                return "bg-gray-50"
            default:
                return "bg-gray-50"
        }
    }

    return (
        <Card className="bg-white overflow-hidden">
            <CardContent className="p-0">
                <div className="p-4 flex justify-between items-start">
                    <div className={`${getLogoBg(logoType)} w-12 h-12 rounded-full flex items-center justify-center`}>
                        <Image src={logo || "/placeholder.svg"} alt={name} width={40} height={40} />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={18} />
                    </Button>
                </div>
                <div className="px-4 pb-2 text-center">
                    <h3 className="font-medium text-lg">{name}</h3>
                    <p className="text-xs text-gray-500">Open Deals Amount</p>
                    <p className="font-bold text-lg">${amount}</p>
                </div>
                <div className="border-t border-gray-100 mt-2">
                    <div className="grid grid-cols-2 divide-x">
                        <div className="p-3">
                            <p className="text-xs text-gray-500 mb-2 text-center">Related Contacts</p>
                            <div className="flex justify-center">
                                <div>
                                    <Avatar className="h-8 w-8 border-2 border-white">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                                        <AvatarFallback>C1</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="h-8 w-8 border-2 border-white">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                                        <AvatarFallback>C2</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="h-8 w-8 border-2 border-white">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                                        <AvatarFallback>C3</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <p className="text-xs text-gray-500 mb-2 text-center">Agent Resp</p>
                            <div className="flex justify-center">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Agent" />
                                    <AvatarFallback>AR</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
