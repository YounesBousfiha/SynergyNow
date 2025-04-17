"use client"

import Link from "next/link"
import {
    LayoutDashboard,
    Kanban,
    Users,
    Building2,
    FileText,
    MessageSquare,
    Crown,
    SettingsIcon,
    UserCog,
    Bell,
    Globe,
    Shield,
    Save,
    Plus,
    Search,
    Eye,
    PenSquare,
    Trash2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Switch } from "../../../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Badge } from "../../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"

export default function Settings() {

    return (
        <div className="flex-1">
            {/* Top Bar */}
            <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-end px-6">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User"/>
                    <AvatarFallback>AR</AvatarFallback>
                </Avatar>
            </header>

            {/* Content */}
            <main className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Administration Settings</h1>
                    <p className="text-gray-500">Manage your application settings and user permissions</p>
                </div>

                <Tabs defaultValue="settings" className="w-full">
                    <TabsList className="mb-6 bg-white border">
                        <TabsTrigger value="settings"
                                     className="data-[state=active]:bg-[#06ae6f] data-[state=active]:text-white">
                            <SettingsIcon className="mr-2 h-4 w-4"/>
                            System Settings
                        </TabsTrigger>
                        <TabsTrigger
                            value="usersManager"
                            className="data-[state=active]:bg-[#06ae6f] data-[state=active]:text-white"
                        >
                            <UserCog className="mr-2 h-4 w-4"/>
                            User Manager
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="settings" className="space-y-6">
                        {/* General Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Globe className="mr-2 h-5 w-5 text-[#06ae6f]"/>
                                    General Settings
                                </CardTitle>
                                <CardDescription>Configure general application settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name</Label>
                                        <Input id="companyName" defaultValue="SynergyNow"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Default Timezone</Label>
                                        <Select defaultValue="utc">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select timezone"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                                                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                                                <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                                                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Default Language</Label>
                                        <Select defaultValue="en">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateFormat">Date Format</Label>
                                        <Select defaultValue="mdy">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select date format"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                                <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notification Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="mr-2 h-5 w-5 text-[#06ae6f]"/>
                                    Notification Settings
                                </CardTitle>
                                <CardDescription>Configure system notification preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Email Notifications</h4>
                                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">In-App Notifications</h4>
                                        <p className="text-sm text-gray-500">Receive notifications within the
                                            application</p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Task Reminders</h4>
                                        <p className="text-sm text-gray-500">Receive reminders for upcoming tasks</p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Deal Updates</h4>
                                        <p className="text-sm text-gray-500">Receive updates when deals change
                                            status</p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="mr-2 h-5 w-5 text-[#06ae6f]"/>
                                    Security Settings
                                </CardTitle>
                                <CardDescription>Configure security and privacy settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Password Expiry</h4>
                                        <p className="text-sm text-gray-500">Force password reset every 90 days</p>
                                    </div>
                                    <Switch/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Session Timeout</h4>
                                        <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>
                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                                    <Input id="timeout" type="number" defaultValue="30" className="max-w-[200px]"/>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90 flex items-center gap-2">
                                <Save size={16}/>
                                Save Settings
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="usersManager">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center">
                                        <Users className="mr-2 h-5 w-5 text-[#06ae6f]"/>
                                        User Management
                                    </CardTitle>
                                    <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90 flex items-center gap-2">
                                        <Plus size={16}/>
                                        Add User
                                    </Button>
                                </div>
                                <CardDescription>Manage user accounts and permissions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 flex justify-end">
                                    <div className="relative w-[300px]">
                                        <Search
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={18}/>
                                        <Input className="pl-10" placeholder="Search users..."/>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                        <tr className="border-b text-gray-500 text-sm">
                                            <th className="text-left py-4 px-6 font-medium">User</th>
                                            <th className="text-left py-4 px-6 font-medium">Email</th>
                                            <th className="text-left py-4 px-6 font-medium">Role</th>
                                            <th className="text-left py-4 px-6 font-medium">Status</th>
                                            <th className="text-left py-4 px-6 font-medium">Last Login</th>
                                            <th className="text-left py-4 px-6 font-medium">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <UserRow
                                            name="Jane Cooper"
                                            email="jane@example.com"
                                            role="Admin"
                                            status="Active"
                                            lastLogin="Today, 10:30 AM"
                                        />
                                        <UserRow
                                            name="Robert Fox"
                                            email="robert@example.com"
                                            role="Manager"
                                            status="Active"
                                            lastLogin="Yesterday, 3:15 PM"
                                        />
                                        <UserRow
                                            name="Esther Howard"
                                            email="esther@example.com"
                                            role="User"
                                            status="Inactive"
                                            lastLogin="Mar 20, 2023"
                                        />
                                        <UserRow
                                            name="Cameron Williamson"
                                            email="cameron@example.com"
                                            role="User"
                                            status="Active"
                                            lastLogin="Today, 9:45 AM"
                                        />
                                        <UserRow
                                            name="Brooklyn Simmons"
                                            email="brooklyn@example.com"
                                            role="Manager"
                                            status="Active"
                                            lastLogin="Mar 25, 2023"
                                        />
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
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

// User Row Component
function UserRow({
                     name,
                     email,
                     role,
                     status,
                     lastLogin,
}) {
    const getStatusBadge = (status) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-100 text-green-800 font-medium">{status}</Badge>
            case "Inactive":
                return <Badge className="bg-gray-100 text-gray-800 font-medium">{status}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const getRoleBadge = (role) => {
        switch (role) {
            case "Admin":
                return <Badge className="bg-purple-100 text-purple-800 font-medium">{role}</Badge>
            case "Manager":
                return <Badge className="bg-blue-100 text-blue-800 font-medium">{role}</Badge>
            case "User":
                return <Badge className="bg-[#a8e6cf] text-[#296c5c] font-medium">{role}</Badge>
            default:
                return <Badge>{role}</Badge>
        }
    }

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{name}</td>
            <td className="py-4 px-6">{email}</td>
            <td className="py-4 px-6">{getRoleBadge(role)}</td>
            <td className="py-4 px-6">{getStatusBadge(status)}</td>
            <td className="py-4 px-6">{lastLogin}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Eye size={18}/>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <PenSquare size={18}/>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 size={18}/>
                    </Button>
                </div>
            </td>
        </tr>
    )
}