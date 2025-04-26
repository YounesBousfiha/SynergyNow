"use client"
import Link from "next/link"
import {
    LayoutDashboard,
    Kanban,
    Users,
    Building2,
    MessageSquare,
    Crown,
    ListTodo,
    Workflow, Settings, Logs, ClipboardPlus, MessageCircle, Mail
} from "lucide-react";
import { usePathname }  from "next/navigation";
import {useState, useEffect} from "react";


// TODO: continue the active states
export default function SideBar() {

    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(pathname)
    }, [pathname])

    const isActive = (href) => {
        return pathname === href;
    }
    const links = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
        { name: 'Scrumsboards', icon: <Kanban size={20} />,
            items: [
                { name: 'Task Manager', icon: <ListTodo  size={20}/>, href: '/dashboard/scrumboard/tasks' },
                { name: 'Pipeline', icon: <Workflow size={20}/>, href: '/dashboard/scrumboard/deals'}
            ]
        },
        { name: 'Contacts', icon: <Users size={20} />, href: '/dashboard/contacts' },
        {name: 'Companies', icon: <Building2 size={20}/>, href: '/dashboard/companies'},
        {name: 'Quotes', icon: <ClipboardPlus size={20} />, href: '/dashboard/quotes'},
        {name: 'Messages', icon: <MessageSquare size={20}/>,             items: [
                { name: 'chat', icon: <MessageCircle  size={20}/>, href: '/dashboard/messages/chat' },
                { name: 'Email', icon: <Mail size={20}/>, href: '/dashboard/messages/email'}
            ]},
        {
            name: 'Administration',
            icon: <Crown size={20}/>,
            items: [
                { name: 'Settings', icon: <Settings size={20} />  ,href: '/dashboard/administration/settings' },
                { name: 'Audit Logs', icon:<Logs  size={20}/>  ,href: '/dashboard/administration/logs' },

            ]
        }
    ]

    return (
        <aside className="w-[220px] h-screen bg-[#f9f9f9] border-r border-gray-200 flex flex-col">
            <div className="p-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="bg-[#06ae6f] rounded-full p-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Your existing SVG paths */}
                        </svg>
                    </div>
                    <span className="font-bold text-lg">SynergyNow</span>
                </Link>
            </div>

            <nav className="flex-1 py-8">
                <ul className="space-y-1">
                    {links.map((link, index) => (
                        <li key={index}>
                            {link.href ? (
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${isActive(link.href) ? 'bg-gray-100 text-[#06ae6f]' : 'hover:bg-gray-100'}`}
                                >
                                    <span
                                        className={isActive(link.href) ? 'text-[#06ae6f]' : 'text-gray-500'}>{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ) : (
                                <details className="group">
                                    <summary className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer list-none `}>
                                        <span className="text-gray-500">{link.icon}</span>
                                        <span>{link.name}</span>
                                    </summary>
                                    <ul className="pl-8 space-y-1">
                                        {link.items?.map((item, itemIndex) => (
                                            <li key={itemIndex}>
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center gap-3 py-2 px-4 hover:bg-gray-100 transition-colors `}
                                                >
                                                    <span className="text-gray-500">{item.icon}</span>
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}