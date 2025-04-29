"use client"

import { Label } from "../../../../components/ui/label"


import { useState, useEffect } from "react"
import Link from "next/link"
import {
    LayoutDashboard,
    Kanban,
    Users,
    Building2,
    FileText,
    MessageSquare,
    Crown,
    Inbox,
    Send,
    File,
    Trash2,
    Star,
    StarOff,
    Archive,
    RefreshCcw,
    Search,
    Plus,
    ChevronDown,
    Paperclip,
    X,
    Mail,
    MailOpen,
    Reply,
    Forward,
    MoreHorizontal,
    Loader2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Badge } from "../../../../components/ui/badge"
import { Separator } from "../../../../components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../../components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"

// Mock email data - replace with actual API call
const mockEmails = [
    {
        id: "1",
        from: { name: "John Doe", email: "john.doe@example.com" },
        to: { name: "Me", email: "me@example.com" },
        subject: "Project Update - SynergyNow Implementation",
        body: `<p>Hi there,</p>
           <p>I wanted to provide an update on the SynergyNow implementation. We've made significant progress on the following items:</p>
           <ul>
             <li>User authentication system is now complete</li>
             <li>Dashboard analytics are functioning properly</li>
             <li>Contact management module is ready for testing</li>
           </ul>
           <p>Please let me know if you have any questions or concerns.</p>
           <p>Best regards,<br>John</p>`,
        date: "2023-05-15T10:30:00",
        isRead: true,
        isStarred: false,
        hasAttachments: false,
        folder: "inbox",
    },
    {
        id: "2",
        from: { name: "Sarah Johnson", email: "sarah.johnson@example.com" },
        to: { name: "Me", email: "me@example.com" },
        subject: "Client Meeting - Tomorrow at 2 PM",
        body: `<p>Hello,</p>
           <p>This is a reminder that we have a client meeting scheduled for tomorrow at 2 PM. We'll be discussing the following agenda items:</p>
           <ol>
             <li>Project timeline review</li>
             <li>Budget considerations</li>
             <li>Next steps and action items</li>
           </ol>
           <p>Please make sure to prepare your section of the presentation.</p>
           <p>Thanks,<br>Sarah</p>`,
        date: "2023-05-14T15:45:00",
        isRead: false,
        isStarred: true,
        hasAttachments: true,
        folder: "inbox",
    },
    {
        id: "3",
        from: { name: "Michael Chen", email: "michael.chen@example.com" },
        to: { name: "Me", email: "me@example.com" },
        subject: "Invoice #1234 - SynergyNow Services",
        body: `<p>Dear Client,</p>
           <p>Please find attached the invoice for SynergyNow services provided during the month of April 2023.</p>
           <p>Invoice details:</p>
           <ul>
             <li>Invoice #: 1234</li>
             <li>Amount: $5,250.00</li>
             <li>Due date: May 30, 2023</li>
           </ul>
           <p>If you have any questions regarding this invoice, please don't hesitate to contact our accounting department.</p>
           <p>Regards,<br>Michael Chen<br>Finance Department</p>`,
        date: "2023-05-13T09:15:00",
        isRead: true,
        isStarred: false,
        hasAttachments: true,
        folder: "inbox",
    },
    {
        id: "4",
        from: { name: "Emily Wilson", email: "emily.wilson@example.com" },
        to: { name: "Me", email: "me@example.com" },
        subject: "New Feature Request - Contact Tagging",
        body: `<p>Hi Team,</p>
           <p>Several clients have requested a new feature for contact tagging in the CRM module. This would allow users to:</p>
           <ul>
             <li>Create custom tags for contacts</li>
             <li>Filter contacts by tags</li>
             <li>Generate reports based on tag categories</li>
           </ul>
           <p>Could we discuss this in our next product meeting? I think this would be a valuable addition to our platform.</p>
           <p>Best,<br>Emily</p>`,
        date: "2023-05-12T14:20:00",
        isRead: false,
        isStarred: false,
        hasAttachments: false,
        folder: "inbox",
    },
    {
        id: "5",
        from: { name: "David Kim", email: "david.kim@example.com" },
        to: { name: "Me", email: "me@example.com" },
        subject: "Weekly Team Update - Development Progress",
        body: `<p>Team,</p>
           <p>Here's our weekly development update:</p>
           <h3>Completed:</h3>
           <ul>
             <li>User authentication improvements</li>
             <li>Dashboard performance optimizations</li>
             <li>Bug fixes for contact import feature</li>
           </ul>
           <h3>In Progress:</h3>
           <ul>
             <li>Email integration module</li>
             <li>Reporting dashboard enhancements</li>
             <li>Mobile responsive design updates</li>
           </ul>
           <p>Let me know if you have any questions or concerns.</p>
           <p>Regards,<br>David</p>`,
        date: "2023-05-11T11:00:00",
        isRead: true,
        isStarred: true,
        hasAttachments: false,
        folder: "inbox",
    },
]

export default function EmailPage() {
    const [activeFolder, setActiveFolder] = useState("inbox")
    const [selectedEmail, setSelectedEmail] = useState(null)
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [emails, setEmails] = useState(mockEmails)
    const [searchQuery, setSearchQuery] = useState("")

    // Simulate API loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    // Filter emails based on active folder and search query
    const filteredEmails = emails.filter((email) => {
        const matchesFolder = email.folder === activeFolder
        const matchesSearch =
            searchQuery === "" ||
            email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.from.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.body.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFolder && matchesSearch
    })

    const currentEmail = emails.find((email) => email.id === selectedEmail)

    const handleStarEmail = (id, event) => {
        event.stopPropagation()
        setEmails(emails.map((email) => (email.id === id ? { ...email, isStarred: !email.isStarred } : email)))
    }

    const handleMarkAsRead = (id) => {
        setEmails(emails.map((email) => (email.id === id ? { ...email, isRead: true } : email)))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const isToday = date.toDateString() === now.toDateString()

        if (isToday) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        } else {
            return date.toLocaleDateString([], { month: "short", day: "numeric" })
        }
    }

    return (
        <div className="flex min-h-screen bg-[#f3f3f6]">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Email Client */}
                <div className="flex-1 flex">
                    {/* Email Sidebar */}
                    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                        <div className="p-4">
                            <Button className="w-full bg-[#06ae6f] hover:bg-[#06ae6f]/90 mb-4" onClick={() => setIsComposeOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" /> Compose
                            </Button>

                            <div className="space-y-1">
                                <EmailFolderItem
                                    icon={<Inbox size={18} />}
                                    label="Inbox"
                                    count={emails.filter((e) => e.folder === "inbox" && !e.isRead).length}
                                    isActive={activeFolder === "inbox"}
                                    onClick={() => setActiveFolder("inbox")}
                                />
                                <EmailFolderItem
                                    icon={<Send size={18} />}
                                    label="Sent"
                                    isActive={activeFolder === "sent"}
                                    onClick={() => setActiveFolder("sent")}
                                />
                                <EmailFolderItem
                                    icon={<File size={18} />}
                                    label="Drafts"
                                    isActive={activeFolder === "drafts"}
                                    onClick={() => setActiveFolder("drafts")}
                                />
                                <EmailFolderItem
                                    icon={<Star size={18} />}
                                    label="Starred"
                                    isActive={activeFolder === "starred"}
                                    onClick={() => setActiveFolder("starred")}
                                />
                                <EmailFolderItem
                                    icon={<Archive size={18} />}
                                    label="Archive"
                                    isActive={activeFolder === "archive"}
                                    onClick={() => setActiveFolder("archive")}
                                />
                                <EmailFolderItem
                                    icon={<Trash2 size={18} />}
                                    label="Trash"
                                    isActive={activeFolder === "trash"}
                                    onClick={() => setActiveFolder("trash")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Email Toolbar */}
                        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    className="pl-10"
                                    placeholder="Search emails..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" title="Refresh">
                                    <RefreshCcw size={18} />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal size={18} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                                        <DropdownMenuItem>Sort by date</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Settings</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Email List and Detail View */}
                        <div className="flex-1 flex">
                            {/* Email List */}
                            <div
                                className={`${selectedEmail ? "hidden md:block" : ""} w-full md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="h-8 w-8 text-[#06ae6f] animate-spin" />
                                    </div>
                                ) : filteredEmails.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                                        <Mail className="h-12 w-12 mb-2" />
                                        <p className="text-center">No emails found in this folder</p>
                                    </div>
                                ) : (
                                    <div>
                                        {filteredEmails.map((email) => (
                                            <div
                                                key={email.id}
                                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                                    selectedEmail === email.id ? "bg-gray-100" : ""
                                                } ${!email.isRead ? "font-medium" : ""}`}
                                                onClick={() => {
                                                    setSelectedEmail(email.id)
                                                    handleMarkAsRead(email.id)
                                                }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <button
                                                        className="mt-1 text-gray-400 hover:text-yellow-400"
                                                        onClick={(e) => handleStarEmail(email.id, e)}
                                                    >
                                                        {email.isStarred ? (
                                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                        ) : (
                                                            <StarOff className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="truncate font-medium">{email.from.name}</div>
                                                            <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                                {formatDate(email.date)}
                                                            </div>
                                                        </div>
                                                        <div className="truncate text-sm">{email.subject}</div>
                                                        <div className="truncate text-xs text-gray-500 mt-1">
                                                            {email.body.replace(/<[^>]*>/g, "").substring(0, 80)}...
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            {email.hasAttachments && (
                                                                <Badge variant="outline" className="text-xs py-0">
                                                                    <Paperclip className="h-3 w-3 mr-1" />
                                                                    Attachment
                                                                </Badge>
                                                            )}
                                                            {!email.isRead && <Badge className="bg-[#06ae6f] text-white text-xs py-0">New</Badge>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Email Detail View */}
                            {selectedEmail ? (
                                <div className="w-full md:w-2/3 bg-white overflow-y-auto">
                                    {currentEmail && (
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-xl font-bold">{currentEmail.subject}</h2>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" title="Reply">
                                                        <Reply size={18} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" title="Forward">
                                                        <Forward size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title={currentEmail.isStarred ? "Unstar" : "Star"}
                                                        onClick={(e) => handleStarEmail(currentEmail.id, e)}
                                                    >
                                                        {currentEmail.isStarred ? (
                                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                        ) : (
                                                            <Star className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                    <Button variant="ghost" size="icon" title="More options">
                                                        <MoreHorizontal size={18} />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 mb-6">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback>{currentEmail.from.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-medium">{currentEmail.from.name}</div>
                                                            <div className="text-sm text-gray-500">{currentEmail.from.email}</div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">{new Date(currentEmail.date).toLocaleString()}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        To: {currentEmail.to.name} &lt;{currentEmail.to.email}&gt;
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator className="my-4" />

                                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentEmail.body }} />

                                            {currentEmail.hasAttachments && (
                                                <div className="mt-6">
                                                    <h3 className="text-sm font-medium mb-2">Attachments</h3>
                                                    <div className="flex items-center gap-4">
                                                        <div className="border rounded-md p-3 flex items-center gap-2 bg-gray-50">
                                                            <FileIcon className="h-8 w-8 text-blue-500" />
                                                            <div>
                                                                <div className="text-sm font-medium">Document.pdf</div>
                                                                <div className="text-xs text-gray-500">245 KB</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-8">
                                                <Button className="bg-[#06ae6f] hover:bg-[#06ae6f]/90">
                                                    <Reply className="mr-2 h-4 w-4" /> Reply
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full md:w-2/3 bg-white flex items-center justify-center">
                                    <div className="text-center p-6">
                                        <MailOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No email selected</h3>
                                        <p className="text-gray-500">Select an email from the list to view its contents</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Compose Email Dialog */}
            <ComposeEmailDialog open={isComposeOpen} onOpenChange={setIsComposeOpen} />
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

// Email Folder Item Component
function EmailFolderItem({
                             icon,
                             label,
                             count,
                             isActive,
                             onClick,
}) {
    return (
        <button
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
                isActive ? "bg-[#06ae6f]/10 text-[#06ae6f]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <span className={isActive ? "text-[#06ae6f]" : "text-gray-500"}>{icon}</span>
                <span>{label}</span>
            </div>
            {count !== undefined && count > 0 && <Badge className="bg-[#06ae6f] text-white">{count}</Badge>}
        </button>
    )
}

// File Icon Component
function FileIcon({ className }) {
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Compose Email Dialog Component
function ComposeEmailDialog({
                                open,
                                onOpenChange,
}) {
    const [to, setTo] = useState("")
    const [cc, setCc] = useState("")
    const [bcc, setBcc] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [showCcBcc, setShowCcBcc] = useState(false)
    const [attachments, setAttachments] = useState([])

    const handleAttachmentChange = (e) => {
        if (e.target.files) {
            setAttachments([...attachments, ...Array.from(e.target.files)])
        }
    }

    const removeAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index))
    }

    const handleSend = () => {
        // Here you would integrate with your Laravel Gmail API endpoint
        console.log({
            to,
            cc,
            bcc,
            subject,
            message,
            attachments,
        })

        // Reset form and close dialog
        setTo("")
        setCc("")
        setBcc("")
        setSubject("")
        setMessage("")
        setAttachments([])
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Compose Email</DialogTitle>
                    <DialogDescription>Create and send a new email message</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="to">To</Label>
                            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setShowCcBcc(!showCcBcc)}>
                                {showCcBcc ? "Hide" : "Show"} Cc & Bcc <ChevronDown className="ml-1 h-3 w-3" />
                            </Button>
                        </div>
                        <Input id="to" placeholder="recipient@example.com" value={to} onChange={(e) => setTo(e.target.value)} />
                    </div>

                    {showCcBcc && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="cc">Cc</Label>
                                <Input id="cc" placeholder="cc@example.com" value={cc} onChange={(e) => setCc(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bcc">Bcc</Label>
                                <Input id="bcc" placeholder="bcc@example.com" value={bcc} onChange={(e) => setBcc(e.target.value)} />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Email subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Write your message here..."
                            className="min-h-[200px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    {attachments.length > 0 && (
                        <div className="space-y-2">
                            <Label>Attachments</Label>
                            <div className="space-y-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                        <div className="flex items-center">
                                            <FileIcon className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-sm">{file.name}</span>
                                            <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeAttachment(index)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Label htmlFor="attachment" className="sr-only">
                            Attachment
                        </Label>
                        <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                            <label>
                                <Paperclip className="h-4 w-4 mr-2" />
                                Attach Files
                                <input id="attachment" type="file" className="hidden" multiple onChange={handleAttachmentChange} />
                            </label>
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button className="bg-[#06ae6f] hover:bg-[#06ae6f]/90" onClick={handleSend}>
                        Send Email
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
