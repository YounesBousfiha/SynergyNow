import Link from "next/link"
import Image from "next/image"
import {
    Users,
    Building2,
    LineChart,
    PieChart,
    ListTodo,
    Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { toast } from 'sonner';
import LogOutForm from "./_components/LogoutForm";

export default function DashboardPage() {


    return (
            <div className="flex-1">
                {/* Top Bar */}
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-end px-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <form action="/api/auth/logout" method="POST">
                                <DropdownMenuItem asChild>
                                    <LogOutForm />
                                </DropdownMenuItem>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {/* Content */}
                <main className="p-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <Building2 size={20} />
                                    <span>Number of Companies</span>
                                </div>
                                <div className="text-4xl font-bold">32</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <Users size={20} />
                                    <span>Number of Contacts</span>
                                </div>
                                <div className="text-4xl font-bold">108</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <LineChart size={20} />
                                    <span>Total Deals in pipeline</span>
                                </div>
                                <div className="text-4xl font-bold">293</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <PieChart size={20} />
                                    <span>Total revenues (yearly)</span>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <Image
                                        src="/placeholder.svg?height=250&width=250"
                                        alt="Revenue Pie Chart"
                                        width={250}
                                        height={250}
                                        className="my-4"
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <div>expected 45.905$</div>
                                    <div>total 38.765$</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <LineChart size={20} />
                                        <span>Deals</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                                        <Plus size={14} />
                                        see pipelines
                                    </Button>
                                </div>
                                <div className="flex justify-center">
                                    <Image
                                        src="/placeholder.svg?height=250&width=450"
                                        alt="Deals Line Chart"
                                        width={450}
                                        height={250}
                                        className="my-4"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Activities and Tasks */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-white md:col-span-2">
                            <CardHeader className="p-6 pb-0">
                                <div className="flex items-center gap-3">
                                    <ListTodo size={20} />
                                    <CardTitle>Lastest Activités</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <ActivityItem
                                        logo="/placeholder.svg?height=40&width=40"
                                        time="3 months ago"
                                        name="Pam Beesly"
                                        action="created"
                                        deal="Oriental Bronze Towels"
                                        status="NEW"
                                    />
                                    <ActivityItem
                                        logo="/placeholder.svg?height=40&width=40"
                                        time="3 months ago"
                                        name="Phyllis Smith"
                                        action="created"
                                        deal="Oriental Bronze Towels"
                                        status="WON"
                                    />
                                    <ActivityItem
                                        logo="/placeholder.svg?height=40&width=40"
                                        time="3 months ago"
                                        name="Stanley Hudson"
                                        action="created"
                                        deal="Oriental Bronze Towels"
                                        status="NEW"
                                    />
                                    <ActivityItem
                                        logo="/placeholder.svg?height=40&width=40"
                                        time="3 months ago"
                                        name="Oscar Martinez"
                                        action="created"
                                        deal="Oriental Bronze Towels"
                                        status="Lost"
                                    />
                                    <ActivityItem
                                        logo="/placeholder.svg?height=40&width=40"
                                        time="3 months ago"
                                        name="Angela Martin"
                                        action="created"
                                        deal="Oriental Bronze Towels"
                                        status="Under Review"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardHeader className="p-6 pb-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ListTodo size={20} />
                                        <CardTitle>Tasks</CardTitle>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                                        <Plus size={14} />
                                        Task manager
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex justify-center">
                                    <Image
                                        src="/placeholder.svg?height=200&width=200"
                                        alt="Tasks Donut Chart"
                                        width={200}
                                        height={200}
                                        className="my-4"
                                    />
                                </div>
                            </CardContent>
                        </Card>
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

// Activity Item Component
function ActivityItem({
                          logo,
                          time,
                          name,
                          action,
                          deal,
                          status,
}) {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "new":
                return "text-blue-600 font-medium"
            case "won":
                return "text-green-600 font-medium"
            case "lost":
                return "text-red-600 font-medium"
            case "under review":
                return "text-orange-600 font-medium"
            default:
                return "text-gray-600 font-medium"
        }
    }

    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
                <AvatarImage src={logo || "/placeholder.svg"} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <div className="text-sm text-gray-500">{time}</div>
                <div>
                    <span className="font-medium">{name}</span> {action} <span className="font-medium">{deal}</span> deal in{" "}
                    <span className={getStatusColor(status)}>{status}</span>.
                </div>
            </div>
        </div>
    )
}




