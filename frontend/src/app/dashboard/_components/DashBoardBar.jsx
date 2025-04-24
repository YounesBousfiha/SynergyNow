"use client"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "../../../components/ui/avatar";
import LogOutForm from "./LogoutForm";
import Link from 'next/link';
import { useAuth } from '../../../store/useAuth';

export default function DashBar() {

    const { user } = useAuth();
    return (
        <>
            <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-end px-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.image} alt={`${user?.firstname} ${user?.lastname}`}/>
                            <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]} </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="font-semibold">{`${user?.firstname} ${user?.lastname}`}</DropdownMenuLabel>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <Link href="/dashboard/accountsettings">Settings</Link>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <form action="/api/auth/logout" method="POST">
                            <DropdownMenuItem asChild>
                                <LogOutForm/>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </>
    );
}