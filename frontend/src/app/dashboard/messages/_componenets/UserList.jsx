"use client"

import { Users } from "lucide-react";
import { useState } from "react";
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../../components/ui/dialog";
import {toast} from "sonner";
import {chatService} from '../../../../services/ChatService';
export default function UserList({ contacts }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    // TODO: lift the convertsation State
    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setIsOpen(true);
    }

    const handleConversationCreation = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', title);
        formData.append('collaborator_id', selectedContact.id);

        const data = Object.fromEntries(formData);

        try {
            const response = await chatService.createChat(data)
            if(response.status === 200) {
                toast.success('Conversation is Created');
            }
        } catch (error) {
            toast.error('Error while Creating Conversation: ', error);
        }
    }

    return (
        <div>
            {contacts && contacts.length > 0 ? (
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => handleContactClick(contact)}
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                            {contact.image ? (
                                <img
                                    src={contact.image || "https://res.cloudinary.com/dashccxm0/image/upload/v1744558255/Person1_fctj1h.png"}
                                    alt={`${contact.firstname}'s profile`}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 text-lg uppercase">
                                        {contact.firstname?.[0]}{contact.lastname?.[0]}
                                    </span>
                                </div>
                            )}
                            <div>
                                <p className="font-medium">
                                    {contact.firstname} {contact.lastname}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-4">
                    <Users className="h-12 w-12 mx-auto mb-2 text-gray-300"/>
                    <p className="text-gray-500">Your contacts will appear here</p>
                </div>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedContact && `Chat with ${selectedContact.firstname} ${selectedContact.lastname}`}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleConversationCreation}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-3">
                                <Label className="col-span-1" forhtml="title">Conversation Title: </Label>
                                <Input
                                    className="col-span-2"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                >Start Conversation</Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}