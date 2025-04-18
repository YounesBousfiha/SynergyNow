import {Button} from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";
import { Trash2 } from 'lucide-react';
import {useState} from "react";
import { useUsersStore } from '../../../../../store/useUsers';
import {toast} from "sonner";
import {userService} from "../../../../../services/UserService";
export default function UserRow({
    id,
                                            name,
                                            email,
                                            role,
                                            last_login_at
                                        }) {

    const { removeUsers } = useUsersStore();
    const [isOpen, setIsOpen] = useState(false);

    const getRoleBadge = (role) => {
        switch (role) {
            case "Superadmin":
                return <Badge className="bg-purple-100 text-purple-800 font-medium">{role}</Badge>
            case "Admin":
                return <Badge className="bg-blue-100 text-blue-800 font-medium">{role}</Badge>
            case "Agent":
                return <Badge className="bg-[#a8e6cf] text-[#296c5c] font-medium">{role}</Badge>
            default:
                return <Badge>{role}</Badge>
        }
    }

    const handleDelete = async () => {
        try {
            const res = await userService.deleteUser(id);
            if(res.status === 200) {
                toast.success('User has Been Deleted');
                removeUsers(id);
            }
        } catch (error) {
            toast.error('Failed to Delete user:', error);
        }
    }

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{name}</td>
            <td className="py-4 px-6">{email}</td>
            <td className="py-4 px-6">{getRoleBadge(role)}</td>
            <td className="py-4 px-6">{last_login_at}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <Button onClick={handleDelete} variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 size={18}/>
                    </Button>
                </div>
            </td>
        </tr>
    )
}