"use client"
import { useState } from "react"
import Link from "next/link"
import {
    Users,
    Search,
    Phone,
    Video,
    MoreVertical,
    Paperclip,
    ImageIcon,
    Smile,
    Send,
    Check,
    CheckCheck,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Badge } from "../../../../components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"

// Mock data for chat contacts
const chatContacts = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Let me know when you're free to discuss the project",
        time: "10:30 AM",
        unread: 2,
        online: true,
    },
    {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "I've sent you the invoice for April",
        time: "Yesterday",
        unread: 0,
        online: true,
    },
    {
        id: "3",
        name: "Emily Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Can we schedule a meeting for tomorrow?",
        time: "Yesterday",
        unread: 0,
        online: false,
    },
    {
        id: "4",
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Here's the weekly development update",
        time: "Monday",
        unread: 0,
        online: false,
    },
    {
        id: "5",
        name: "Jessica Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Thanks for your help with the client presentation",
        time: "Monday",
        unread: 0,
        online: true,
    },
]

// Mock data for chat messages
const chatMessages = [
    {
        id: "1",
        sender: "Sarah Johnson",
        content: "Hi there! How's the SynergyNow implementation going?",
        time: "10:15 AM",
        isMe: false,
        status: "read",
    },
    {
        id: "2",
        sender: "Me",
        content:
            "It's going well! We've completed the user authentication system and are now working on the dashboard analytics.",
        time: "10:18 AM",
        isMe: true,
        status: "read",
    },
    {
        id: "3",
        sender: "Sarah Johnson",
        content:
            "That's great to hear! Do you have an estimated timeline for when the contact management module will be ready for testing?",
        time: "10:20 AM",
        isMe: false,
        status: "read",
    },
    {
        id: "4",
        sender: "Me",
        content: "We're aiming to have it ready by the end of next week. I'll keep you updated on our progress.",
        time: "10:22 AM",
        isMe: true,
        status: "read",
    },
    {
        id: "5",
        sender: "Sarah Johnson",
        content:
            "Perfect! Let me know when you're free to discuss the project in more detail. I have some ideas for additional features that might be valuable.",
        time: "10:30 AM",
        isMe: false,
        status: "delivered",
    },
]

export default function ChatPage() {
    const [activeContact, setActiveContact] = useState("1")
    const [messageInput, setMessageInput] = useState("")

    const currentContact = chatContacts.find((contact) => contact.id === activeContact)

    return (
        <div className="flex bg-[#f3f3f6]">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Chat Interface */}
                <div className="flex-1 flex">
                    {/* Chat Sidebar */}
                    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input className="pl-10" placeholder="Search conversations..." />
                            </div>
                        </div>

                        <Tabs defaultValue="chats" className="flex-1 flex flex-col">
                            <TabsList className="grid grid-cols-2 mx-4 mt-2">
                                <TabsTrigger value="chats" className="data-[state=active]:bg-[#06ae6f] data-[state=active]:text-white">
                                    Chats
                                </TabsTrigger>
                                <TabsTrigger
                                    value="contacts"
                                    className="data-[state=active]:bg-[#06ae6f] data-[state=active]:text-white"
                                >
                                    Contacts
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="chats" className="flex-1 overflow-y-auto p-0 mt-2">
                                <div className="space-y-1">
                                    {chatContacts.map((contact) => (
                                        <button
                                            key={contact.id}
                                            className={`w-full flex items-start gap-3 p-3 hover:bg-gray-50 ${
                                                activeContact === contact.id ? "bg-gray-100" : ""
                                            }`}
                                            onClick={() => setActiveContact(contact.id)}
                                        >
                                            <div className="relative">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {contact.online && (
                                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <div className="flex items-center justify-between">
                                                    <div className="font-medium truncate">{contact.name}</div>
                                                    <div className="text-xs text-gray-500">{contact.time}</div>
                                                </div>
                                                <div className="text-sm text-gray-500 truncate">{contact.lastMessage}</div>
                                            </div>
                                            {contact.unread > 0 && (
                                                <Badge className="bg-[#06ae6f] text-white ml-1 self-center">{contact.unread}</Badge>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="contacts" className="flex-1 overflow-y-auto p-4">
                                <div className="text-center text-gray-500 py-8">
                                    <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                    <p>Your contacts will appear here</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Chat Content */}
                    <div className="flex-1 flex flex-col bg-gray-50">
                        {/* Chat Header */}
                        {currentContact && (
                            <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={currentContact.avatar || "/placeholder.svg"} alt={currentContact.name} />
                                            <AvatarFallback>{currentContact.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {currentContact.online && (
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium">{currentContact.name}</div>
                                        <div className="text-xs text-gray-500">{currentContact.online ? "Online" : "Offline"}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Phone size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Video size={18} />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <MoreVertical size={18} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                                            <DropdownMenuItem>View contact</DropdownMenuItem>
                                            <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                                            <DropdownMenuItem>Block contact</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500">Delete conversation</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        )}

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {chatMessages.map((message) => (
                                <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                                    <div className="flex items-end gap-2 max-w-[70%]">
                                        {!message.isMe && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.sender} />
                                                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div
                                            className={`rounded-lg p-3 ${
                                                message.isMe
                                                    ? "bg-[#06ae6f] text-white rounded-br-none"
                                                    : "bg-white border border-gray-200 rounded-bl-none"
                                            }`}
                                        >
                                            <div className="text-sm">{message.content}</div>
                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                <span className="text-xs opacity-70">{message.time}</span>
                                                {message.isMe && (
                                                    <span className="text-xs opacity-70">
                            {message.status === "sent" && <Check size={12} />}
                                                        {message.status === "delivered" && <Check size={12} />}
                                                        {message.status === "read" && <CheckCheck size={12} />}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="bg-white p-4 border-t border-gray-200">
                            <div className="flex items-end gap-2">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Paperclip size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <ImageIcon size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Smile size={18} />
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <Input
                                        placeholder="Type a message..."
                                        className="rounded-full"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                </div>
                                <Button className="rounded-full bg-[#06ae6f] hover:bg-[#06ae6f]/90" size="icon">
                                    <Send size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
