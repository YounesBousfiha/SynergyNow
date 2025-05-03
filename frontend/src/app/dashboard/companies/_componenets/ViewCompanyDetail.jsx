"use client"

import {useState} from "react";
import {DialogHeader, DialogDescription, DialogTitle, DialogFooter, Dialog, DialogClose, DialogContent} from "../../../../components/ui/dialog";
import {Separator} from "../../../../components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "../../../../components/ui/avatar";
import {Button} from "../../../../components/ui/button";
import {Eye, Mail, Phone, Globe, MapPin, ExternalLink, UserPlus, X} from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { Label } from "../../../../components/ui/label";
import {Input} from "../../../../components/ui/input";
import { Textarea} from "../../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import {toast} from "sonner";
import {contactService} from "../../../../services/contactService";

export default function ViewCompanyDetail({
                                            id,
                                            logo,
                                            name,
                                            amount,
                                            logoType,
                                            industry,
                                            description,
                                            address,
                                            email,
                                            phone,
                                            website,
                                            founded,
                                            contacts = []
                                          }) {

    const [isOpen , setIsOpen] = useState(false);

    const getRandomContacts = (contacts, count) => {
        const shuffled = [...contacts].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    return (
        <>
            <div className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
                <Eye size={18} />
                View
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-[300px] sm:w-[500px]">
                    <DialogHeader>
                        <div className="flex items-center gap-4">
                            <div
                                className={`${getLogoBg(logoType)} w-16 h-16 rounded-full flex items-center justify-center`}
                            >
                                <Image
                                    src={logo || "/placeholder.svg"}
                                    alt={name}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">{name}</DialogTitle>
                                <DialogDescription>{industry}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>


                        <div className="space-y-4 my-2">
                        <p className="text-sm text-gray-600">{description}</p>
                                <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <MapPin size={18} className="text-gray-500 mt-0.5" />
                                    <div className="text-sm">{address}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={18} className="text-gray-500" />
                                    <div className="text-sm">{phone}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={18} className="text-gray-500" />
                                    <div className="text-sm">{email}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe size={18} className="text-gray-500" />
                                    <div className="text-sm">{website}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Founded:</span>
                                    <span className="text-sm font-medium">{founded}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Open Deals:</span>
                                    <span className="text-sm font-medium">${amount}</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                            <div>
                                <h3 className="text-sm font-medium mb-2">Related Contacts</h3>
                                <div className="space-y-2">
                                    {getRandomContacts(contacts, 3).map((contact) => (
                                        <div key={contact?.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={contact?.image || "/placeholder.svg"}
                                                        alt={`${contact.firstname} ${contact.lastname}`}
                                                    />
                                                    <AvatarFallback>
                                                        {`${contact.firstname[0]}${contact.lastname[0]}`}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-medium">
                                                        {`${contact.firstname} ${contact.lastname}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8"
                                                title={`Email: ${contact.email}`}
                                                onClick={() => window.open(`mailto:${contact.email}`)}>
                                                <Mail size={16} className="mr-1" />
                                                Contact
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div>

                    <DialogFooter className="flex flex-row-reverse justify-between items-center">
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href={`/dashboard/contacts?company=${id}`}>
                                    <ExternalLink size={16}/>
                                    View Contacts
                                </Link>
                            </Button>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="sm">
                                <X size={16} className="mr-1"/>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

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