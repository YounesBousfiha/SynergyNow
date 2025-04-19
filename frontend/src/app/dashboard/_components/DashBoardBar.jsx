import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "../../../components/ui/avatar";
import LogOutForm from "./LogoutForm";

export default function DashBar() {
    return (
        <>
            <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-end px-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User"/>
                            <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            Settings
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