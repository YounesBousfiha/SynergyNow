"use client"

import {DropdownMenuShortcut} from "../../../components/ui/dropdown-menu";
import { toast } from "sonner";
import { authService} from "../../../services/authService";
import { useAuth } from "../../../store/useAuth";
import { useRouter } from "next/navigation"

export default function LogOutForm() {

    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("From LogOut : ", user);

        toast.loading('Logout....')

        try {
            await authService.logout();
            toast.success(`Bye Bye`);
            router.push('/login');
        } catch (error) {
            console.error("hello Error: ", error);
            toast.error('Error while logout :', error);
        }
    }

    return (
        <button onClick={handleLogout} className="w-full" type="submit">
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </button>
    );
}