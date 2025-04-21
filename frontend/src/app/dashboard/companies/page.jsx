"use client"

import Image from "next/image"
import {
    Search,
    MoreHorizontal,
    UserPlus,
    Eye,
    Trash2
} from "lucide-react"
import AddCompanyBtn from "./_componenets/AddCompanyBtn";

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import {useCompanyStore} from "../../../store/useCompany";
import {companyService} from "../../../services/companyService";
import {toast} from "sonner";
import {DeleteDialog} from "./_componenets/DeleteDialog";
import ViewCompanyDetail from "./_componenets/ViewCompanyDetail";
import {useState} from "react";

export default function CompaniesPage() {
    const {  clients } = useCompanyStore();
    const [search, setSearch] = useState("");


    const filteredClients = search.trim() === ""
        ? clients
        : clients.filter(client =>
            client.name.toLowerCase().includes(search.toLowerCase()) ||
            client.industry?.toLowerCase().includes(search.toLowerCase()) ||
            client.email.toLowerCase().includes(search.toLowerCase())
        );

    return (
            <div className="flex-1">
                {/* Content */}
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <AddCompanyBtn />
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input className="pl-10 w-[300px]"
                                   placeholder="Search..."
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Companies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClients.map((client) => {
                            return <CompanyCard
                                key={client.id}
                                id={client.id}
                                logo={client.image || "https://placehold.co/600x400/png"}
                                name={client.name} website={client.website}
                                founded={client.founded}
                                amount="0"
                                logoType="ge"
                                description={client.description}
                                address={client.address}
                                email={client.email}
                                phone={client.phone}
                                industry={client.industry}
                            />
                        })}
                    </div>
                </main>
            </div>
    )
}

// Company Card Component
function CompanyCard({
                         id,
                         logo,
                         name,
                         amount,
                         description,
                         address,
                         email,
                         phone,
                         logoType,
                         website,
                         founded
}) {

    const { removeClient } = useCompanyStore();
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

    const handleDelete = async (id) => {
        try {
            const response  = await companyService.delete(id);
            if(response.status === 200) {
                removeClient(id);
                toast.success("Client Deleted");
            }
        } catch (e) {
            toast.error("Error while deleting company");
        }
    }

    const handleView = () => {
        // Handle view action here
        console.log("Hello");
    }

    return (
        <Card className="bg-white overflow-hidden">
            <CardContent className="p-0">
                <div className="p-4 flex justify-between items-start">
                    <div className={`${getLogoBg(logoType)} w-12 h-12 rounded-full flex items-center justify-center`}>
                        <Image src={logo || "/placeholder.svg"} alt={name} width={40} height={40} />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={(event) => event.preventDefault()}>
                                    <ViewCompanyDetail
                                        id={id}
                                        logo={logo}
                                        name={name}
                                        amount={amount}
                                        description={description}
                                        email={email}
                                        address={address}
                                        phone={phone}
                                        website={website}
                                        logoType={logoType}
                                        founded={founded}
                                        handleView={handleView}
                                    />
                                </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={event => event.preventDefault()}>
                                <DeleteDialog handleDelete={handleDelete} id={id}  />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                                <div className="flex gap-2">
                                    <Avatar className="h-8 w-8 border-2 border-white" key="contact-1">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                                        <AvatarFallback>C1</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="h-8 w-8 border-2 border-white" key="contact-2">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                                        <AvatarFallback>C2</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="h-8 w-8 border-2 border-white" key="contact-3">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                                        <AvatarFallback>C3</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                        {/*<div className="p-3">
                            <p className="text-xs text-gray-500 mb-2 text-center">Agent Resp</p>
                            <div className="flex justify-center">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Agent" />
                                    <AvatarFallback>AR</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
