import {Button} from "../../../../../components/ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../components/ui/card';
import { Label } from '../../../../../components/ui/label';
import { Input} from "../../../../../components/ui/input";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "../../../../../components/ui/select";
import { Badge } from "../../../../../components/ui/badge";
import { Trash2, Eye, Pencil } from 'lucide-react';
import {useState} from "react";
import { useUsersStore } from '../../../../../store/useUsers';
import {toast} from "sonner";
import {userService} from "../../../../../services/UserService";
import { useAuth } from '../../../../../store/useAuth';
import { Sheet, SheetContent, SheetTrigger, SheetTitle} from '../../../../../components/ui/sheet';
export default function UserRow({
                                            id,
                                            name,
                                            image,
                                            email,
                                            role,
                                            last_login_at
                                        }) {

    const { removeUsers } = useUsersStore();
    const { user } = useAuth();
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

    const handleEdit = async () => {}

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{name}</td>
            <td className="py-4 px-6">{email}</td>
            <td className="py-4 px-6">{getRoleBadge(role)}</td>
            <td className="py-4 px-6">{last_login_at}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <UserViewSheet
                        user={{
                            id,
                            name,
                            email,
                            role,
                            last_login_at,
                            image
                        }}
                    />
                    <Button onClick={handleEdit} variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:bg-green-500 hover:text-white">
                        <Pencil size={18}/>
                    </Button>
                    { user.role_id !== 1 ? (
                        <Button onClick={handleDelete} variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-500 hover:text-white">
                            <Trash2 size={18}/>
                        </Button>
                    ) : null }
                </div>
            </td>
        </tr>
    )
}

function UserViewSheet({ user }) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await userService.changeUserRole(user.id, data);
            if(response.status === 200) {
                toast.success('User Role has Been Updated');
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while Changing User Role : ", error);
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-blue-500 hover:text-white">
                    <Eye size={18} />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
                <SheetTitle className="text-lg font-semibold text-center">User Details</SheetTitle>

                <div className="p-4 flex justify-center">
                    <div className="rounded-full flex justify-center overflow-hidden w-44 h-44">
                        <Image
                            src={user.image || "https://res.cloudinary.com/dashccxm0/image/upload/v1745004599/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp_ire0uq.jpg"}
                            alt="User Profile"
                            className="object-cover"
                            width={180}
                            height={180}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center text-gray-700">
                                <span className="font-medium w-24">FirstName:</span>
                                <span>{SplitFullName(user.name).firstName}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <span className="font-medium w-24">Lastname:</span>
                                <span>{SplitFullName(user.name).lastName}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <span className="font-medium w-24">Email:</span>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <span className="font-medium w-24">Role:</span>
                                <span>{user.role}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Form Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select defaultValue={user.role} name="role_id">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2">Admin</SelectItem>
                                            <SelectItem value="3">Agent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    className="text-white bg-[#06ae6f] hover:bg-[#296c5c] hover:text-white w-full"
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function SplitFullName(name) {
    const [firstName, lastName] = name.split(' ');
    return {firstName, lastName};
}