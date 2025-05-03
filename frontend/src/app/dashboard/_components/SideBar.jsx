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
    Workflow,
    Settings,
    Logs,
    ClipboardPlus,
    MessageCircle,
    Mail,
    Menu,
    X
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../../store/useAuth";

export default function SideBar() {
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const roleId = useAuth((state) => state.user?.role_id);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Close sidebar when route changes on mobile
        setIsSidebarOpen(false);
    }, [pathname]);

    if (!mounted) {
        return null;
    }

    const isActive = (href) => pathname === href;

    const links = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
        {
            name: 'Scrumsboards',
            icon: <Kanban size={20} />,
            items: [
                { name: 'Task Manager', icon: <ListTodo size={20} />, href: '/dashboard/scrumboard/tasks' },
                { name: 'Pipeline', icon: <Workflow size={20} />, href: '/dashboard/scrumboard/deals' }
            ]
        },
        { name: 'Companies', icon: <Building2 size={20} />, href: '/dashboard/companies' },
        { name: 'Quotes', icon: <ClipboardPlus size={20} />, href: '/dashboard/quotes' },
        {
            name: 'Messages',
            icon: <MessageSquare size={20} />,
            items: [
                { name: 'Chat', icon: <MessageCircle size={20} />, href: '/dashboard/messages/chat' },
                { name: 'Email', icon: <Mail size={20} />, href: '/dashboard/messages/email' }
            ]
        },
        ...(roleId === 1 ? [{
            name: 'Administration',
            icon: <Crown size={20} />,
            items: [
                { name: 'Settings', icon: <Settings size={20} />, href: '/dashboard/administration/settings' },
                { name: 'Audit Logs', icon: <Logs size={20} />, href: '/dashboard/administration/logs' },
            ]
        }] : [])
    ];

    const MenuButton = () => (
        <button
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
            {isSidebarOpen ? (
                <X size={24} className="text-gray-600" />
            ) : (
                <Menu size={24} className="text-gray-600" />
            )}
        </button>
    );

    const Overlay = () => (
        <div
            className={`
                fixed inset-0 bg-black/50 z-30 md:hidden
                transition-opacity duration-300
                ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setIsSidebarOpen(false)}
        />
    );

    return (
        <>
            <MenuButton />
            <Overlay />

            <aside className={`
                fixed top-0 left-0 z-40
                w-[220px] h-screen bg-[#f9f9f9] border-r border-gray-200
                flex flex-col
                transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="bg-[#06ae6f] rounded-full p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="font-bold text-lg">SynergyNow</span>
                    </Link>
                </div>

                <nav className="flex-1 py-8 overflow-y-auto">
                    <ul className="space-y-1">
                        {links.map((link, index) => (
                            <li key={index}>
                                {link.href ? (
                                    <Link
                                        href={link.href}
                                        className={`
                                            flex items-center gap-3 px-4 py-2
                                            transition-colors
                                            hover:bg-gray-100
                                            ${isActive(link.href) ? 'bg-gray-100 text-[#06ae6f]' : ''}
                                        `}
                                    >
                                        <span className={isActive(link.href) ? 'text-[#06ae6f]' : 'text-gray-500'}>
                                            {link.icon}
                                        </span>
                                        <span>{link.name}</span>
                                    </Link>
                                ) : (
                                    <details className="group">
                                        <summary className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer list-none">
                                            <span className="text-gray-500">{link.icon}</span>
                                            <span>{link.name}</span>
                                        </summary>
                                        <ul className="pl-8 space-y-1">
                                            {link.items?.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <Link
                                                        href={item.href}
                                                        className={`
                                                            flex items-center gap-3 py-2 px-4
                                                            transition-colors
                                                            hover:bg-gray-100
                                                            ${isActive(item.href) ? 'text-[#06ae6f]' : ''}
                                                        `}
                                                    >
                                                        <span className={isActive(item.href) ? 'text-[#06ae6f]' : 'text-gray-500'}>
                                                            {item.icon}
                                                        </span>
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
        </>
    );
}