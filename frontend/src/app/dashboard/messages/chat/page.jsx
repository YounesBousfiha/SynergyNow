"use client"
import {useEffect, useState} from "react"
import {
    Search,
    Trash2,
    Paperclip,
    ImageIcon,
    Smile,
    Send,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import UserList from "../_componenets/UserList";
import { userService} from "../../../../services/UserService";
import { chatService} from "../../../../services/ChatService";
import {toast} from "sonner";
import {messageService} from "../../../../services/messageService";
import Pusher from 'pusher-js'

export default function ChatPage() {
    const [activeContact, setActiveContact] = useState("");
    const [messageInput, setMessageInput] = useState("")
    const [chats, setChats] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [pusher, setPusher] = useState(null);

    useEffect(() => {
        async function FetchUsers() {
            const [contactsList, conversations] = await Promise.all([await userService.getAllUsers(), chatService.getAll()])
            setContacts(contactsList.data.message);
            const FormattedConversations = conversations.data.map((node) => ({
                chatId: node.id,
                id: node.collaborator.id,
                title: node.name,
                firstname: node.collaborator.firstname,
                lastname: node.collaborator.lastname,
                avatar: node.collaborator.image,
                lastMessage: node.messages?.[0]?.content || "New Convertsation",
                time: "N/A"
            }));

            setChats(FormattedConversations);
        }
        FetchUsers()
    }, []);



    const currentContact = chats.find((contact) => contact.chatId === activeContact)

    useEffect(() => {
        const pusherInstance = new Pusher('e8490ac1efda2ccd410e', {
            cluster: 'eu',
        });
        setPusher(pusherInstance);

        return () => {
            pusherInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!pusher || !currentContact?.chatId) return;

        const channel = pusher.subscribe(`chat.${currentContact.chatId}`);
        const userId = JSON.parse(localStorage.getItem('auth-storage'))?.state?.user?.id;

        channel.bind('App\\Events\\MessageSent', (data) => {
            setChatMessages((prevMessages) => [...prevMessages, {
                ...data.message,
                isMe: data.message.sender_id === userId
            }]);
        });

        // Cleanup function
        return () => {
            channel.unbind('App\\Events\\MessageSent');
            pusher.unsubscribe(`chat.${currentContact.chatId}`);
        };
    }, [currentContact?.chatId, pusher]);

    const handleSelectedChat = async (contact) => {
        try {
            console.log("ChatId", contact.chatId);
            const messages = await chatService.showChat(contact.chatId);
            console.log(messages.data.messages);
            let userId = JSON.parse(localStorage.getItem('auth-storage')).state.user.id;
            const formattedMessages = messages.data.messages.map((message) => {
                return {
                    ...message,
                    isMe: message.sender_id === userId,
                }
            });
            //console.log(formattedMessages);
            setChatMessages(formattedMessages);
        } catch (error) {
            toast.error("Error fetching chat messages:",);
        }
        setActiveContact(contact.chatId);
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        return `${hours}:${minutes} ${ampm}`;
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', messageInput);

        const data = Object.fromEntries(formData);

        try {
            await messageService.sendMessage(data, currentContact.chatId);
        } catch (error) {
            toast.error("Error sending message:",);
        }
        setMessageInput("");
    }


    return (
        <div className="flex h-screen bg-[#f3f3f6]">
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
                                    {chats.map((contact) => (
                                        <button
                                            key={contact.chatId}
                                            className={`w-full flex items-start gap-3 p-3 hover:bg-gray-50 ${
                                                activeContact === contact.chatId ? "bg-gray-100" : ""
                                            }`}
                                            onClick={() => handleSelectedChat(contact)}
                                        >
                                            <div className="relative">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                                    <AvatarFallback>{contact.firstname.charAt(0)}{contact.lastname.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {contact.online && (
                                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <div className="flex items-center justify-between">
                                                    <div className="font-medium truncate">{contact.firstname.concat(' ', contact.lastname)}</div>
                                                    <div className="text-xs text-gray-500">{contact.time}</div>
                                                </div>
                                                <div className="text-sm text-gray-500 truncate">{contact.lastMessage}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="contacts" className="flex-1 overflow-y-auto p-4">
                                <div className="w-full">
                                    <UserList contacts={contacts} />
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
                                            <AvatarImage src={currentContact.avatar || "/placeholder.svg"}
                                                         alt={currentContact.name}/>
                                            <AvatarFallback>{currentContact.firstname.charAt(0)}{currentContact.lastname.charAt(0)}</AvatarFallback>                                        </Avatar>
                                    </div>
                                    <div>
                                        <div className="font-medium">{currentContact.title}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:text-red-500">
                                        <Trash2 size={18} />
                                    </Button>
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
                                                {/*<AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>*/}
                                            </Avatar>
                                        )}
                                        <div
                                            className={`rounded-lg p-3 ${message.isMe ? 'bg-green-300' : 'bg-white'}`}>
                                            <div className="text-sm ">{message.content}</div>
                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                <span className="text-xs opacity-70">{formatTime(message.created_at)}</span>
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
                                <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2 rounded-full">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Type a message..."
                                            className="rounded-full"
                                            name="content"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="rounded-full bg-[#06ae6f] hover:bg-[#06ae6f]/90" size="icon">
                                        <Send size={18}/>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}