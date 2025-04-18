"use client"

import Link from "next/link"
import {
    Users,
    Building2,
    SettingsIcon,
    UserCog,
    Globe,
    Save,
    Search,
    Trash2, Upload, X, MailOpen
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Badge } from "../../../../components/ui/badge"
import {useEffect, useState} from 'react';
import Image from "next/image";
import { myCompanyService } from '../../../../services/myCompanyServices';
import {toast} from "sonner";
import InvitationDialog from "./_componenets/InvitationDialog";
import {InvitationService} from "../../../../services/InvitationService";
import { userService } from '../../../../services/UserService';
import InvitesUserRown from "./_componenets/InvitesUserRown";
import UserRow from "./_componenets/UserRow";

import { useInvitesStore } from "../../../../store/useInvites";
import { useUsersStore } from "../../../../store/useUsers";
export default function Settings() {

    const { invites, setInvites } = useInvitesStore();
    const { users, setUsers} = useUsersStore();

    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyImage, setCompanyImage] = useState("");
    const [isDragging, setIsDragging] = useState(false);



    useEffect(() => {
        async function fetchCompanyDetails() {
            try {
                const [companyInfo, invitations, usersData ] = await Promise.all([myCompanyService.getCompanyInfo(), InvitationService.getAllInvitation(), userService.getAllUsers()]);
                setCompanyName(companyInfo.data.message[0].name);
                setCompanyDescription(companyInfo.data.message[0].description);
                setInvites(invitations.data.message);
                setUsers(usersData.data.message);
                console.log(usersData.data.message);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        }

        fetchCompanyDetails();
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target?.result) {
                setCompanyImage(e.target.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0])
        }
    }

    const removeImage = () => {
        setCompanyImage(null)
    }

    const handleSubmit  = async (e) => {

        const formData = new FormData();

        const imageFormat = companyImage.split(";")[0].split('/')[1];

        formData.append('name', companyName);
        formData.append('description', companyDescription);

        if(companyImage) {
            const base64response = await fetch(companyImage);
            const blob = await base64response.blob();

            const file = new File([blob], 'company-logo.png', {
                type: `image/${imageFormat}`
            })
            formData.append('image', file);
        }

        try {
            const response = await myCompanyService.updateCompany(formData);
            console.log(response);
            toast.success('Company Profile Updated');
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    }


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
                            value="InvitesManager"
                            className="data-[state=active]:bg-[#06ae6f] data-[state=active]:text-white"
                        >
                            <MailOpen className="mr-2 h-4 w-4"/>
                            Invites Manager
                        </TabsTrigger>
                        <TabsTrigger value="usermanager"
                                     className="data-[state=active]:bg-[#06ae6f] data-[state=active]:text-white"
                        >
                            <UserCog className="mr-2 h-4 w-4"/>
                            User Manager
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="settings" className="space-y-6">

                        <Card>
                            <CardHeader>
                                <Building2 size={24} />
                                <CardTitle>Company Information</CardTitle>
                                <CardDescription>Company Information Preview</CardDescription>
                            </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="flex space-x-20">
                                <div
                                    className="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center overflow-hidden">
                                    {companyImage ? (
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={companyImage || "/placeholder.svg"}
                                                alt="Company logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <Building2 className="h-8 w-8 text-gray-400"/>
                                    )}
                                </div>
                                <div>
                                    <div>
                                        <p>{companyName || "Preview Company name"}</p>
                                    </div>
                                    <div>
                                        <p>{companyDescription || "Preview Company Description"}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        </Card>

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
                                        <Input
                                            id="companyName"
                                            value={companyName}
                                            onChange={(e) => {
                                                setCompanyName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="companyDescription">Company Description</Label>
                                        <Input
                                            id="companyDescription"
                                            value={companyDescription}
                                            onChange={(e) => {
                                                setCompanyDescription(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label>Company Logo</Label>
                                        {!companyImage ? (
                                            <div
                                                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 ${
                                                    isDragging ? "border-[#06ae6f] bg-[#06ae6f]/5" : "border-gray-300"
                                                }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <div className="mb-4 bg-[#06ae6f]/10 p-3 rounded-full">
                                                    <Upload className="h-6 w-6 text-[#06ae6f]"/>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-medium">
                                                        Drag and drop your logo here, or{" "}
                                                        <label className="text-[#06ae6f] cursor-pointer">
                                                            browse
                                                            <input type="file" className="hidden" accept="image/*"
                                                                   onChange={handleFileInputChange}/>
                                                        </label>
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG or SVG
                                                        (max.
                                                        5MB)</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative border rounded-lg p-4 bg-white">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white/90 rounded-full"
                                                    onClick={removeImage}
                                                >
                                                    <X size={16}/>
                                                </Button>
                                                <div className="flex justify-center">
                                                    <div className="relative h-40 w-40">
                                                        <Image
                                                            src={companyImage || "/placeholder.svg"}
                                                            alt="Company logo preview"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2"></div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button onClick={handleSubmit} className="bg-[#296c5c] hover:bg-[#296c5c]/90 flex items-center gap-2">
                                <Save size={16}/>
                                Save Settings
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="InvitesManager">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center">
                                        <Users className="mr-2 h-5 w-5 text-[#06ae6f]"/>
                                        Invitations Management
                                    </CardTitle>
                                </div>
                                <CardDescription>Manage Invitations</CardDescription>
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
                                            <th className="text-left py-4 px-6 font-medium">Email</th>
                                            <th className="text-left py-4 px-6 font-medium">Role</th>
                                            <th className="text-left py-4 px-6 font-medium">Status</th>
                                            <th className="text-left py-4 px-6 font-medium">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {invites.map((invite) => {
                                            return <InvitesUserRown
                                                key={invite.id}
                                                id={invite.id}
                                                email={invite.email}
                                                role={invite.role_id === "1" ? 'Superadmin' :
                                                    invite.role_id === "2" ? 'Admin' :
                                                        invite.role_id === "3" ? 'Agent' : 'User'}
                                                status={invite.is_used ? 'Active' : 'Inactive'}
                                            />
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="usermanager">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center">
                                        <Users className="mr-2 h-5 w-5 text-[#06ae6f]"/>
                                        User Management
                                    </CardTitle>
                                    <InvitationDialog />
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
                                            <th className="text-left py-4 px-6 font-medium">Full name</th>
                                            <th className="text-left py-4 px-6 font-medium">Email</th>
                                            <th className="text-left py-4 px-6 font-medium">Role</th>
                                            <th className="text-left py-4 px-6 font-medium">Last Time Login</th>
                                            <th className="text-left py-4 px-6 font-medium">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user) => {
                                            return <UserRow
                                                key={user.id}
                                                id={user.id}
                                                name={user.firstname + ' ' + user.lastname || "Account still not Active"}
                                                email={user.email}
                                                role={user.role_id === 1 ? 'Superadmin' :
                                                    user.role_id === 2 ? 'Admin' :
                                                        user.role_id === 3 ? 'Agent' : 'User'}
                                                last_login_at={user.last_login_at}
                                            />
                                        })}
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