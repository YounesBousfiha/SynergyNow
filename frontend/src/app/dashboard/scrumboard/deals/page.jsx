import Link from "next/link"
import {
    Plus,
    MoreVertical,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Badge } from "../../../../components/ui/badge"
import { Card, CardContent } from "../../../../components/ui/card"

export default function DealsManagerPage() {
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
                <main className="p-6 overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-6">Deals Manager</h1>

                    <div className="flex gap-4 min-w-max pb-4">
                        {/* Unassigned Column */}
                        <DealsColumn title="Unassigned" count={1}>
                            <DealCard />
                        </DealsColumn>

                        {/* New Column */}
                        <DealsColumn title="New" count={2}>
                            <DealCard />
                            <DealCard />
                        </DealsColumn>

                        {/* FollowUps Column */}
                        <DealsColumn title="FollowUps" count={1}>
                            <DealCard />
                        </DealsColumn>

                        {/* UnderReview Column */}
                        <DealsColumn title="UnderReview" count={2}>
                            <DealCard />
                            <DealCard />
                        </DealsColumn>

                        {/* Demo Column */}
                        <DealsColumn title="Demo" count={1}>
                            <DealCard />
                        </DealsColumn>
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

// Deals Column Component
function DealsColumn({ title, count, children }) {
    return (
        <div className="w-[280px] flex-shrink-0">
            <div className="bg-white rounded-md shadow-sm mb-4 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{title}</span>
                    <Badge variant="outline" className="bg-gray-100">
                        {count}
                    </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-100">
                    <Plus size={16} />
                </Button>
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    )
}

// Deal Card Component
function DealCard() {
    return (
        <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
                            <svg viewBox="0 0 170 170" width="24" height="24">
                                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.253 8.99-3.498 13.1-3.71 0.12 1.083 0.17 2.166 0.17 3.241z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-medium">Apple</div>
                            <div className="text-xs text-gray-500">Deal title</div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                        <MoreVertical size={14} />
                    </Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Assignee" />
                        <AvatarFallback className="text-xs">AR</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">$20.000</span>
                </div>
            </CardContent>
        </Card>
    )
}
