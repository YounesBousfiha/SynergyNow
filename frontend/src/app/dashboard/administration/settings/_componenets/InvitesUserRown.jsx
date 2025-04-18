import {Button} from "../../../../../components/ui/button";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Badge } from "../../../../../components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../../components/ui/dialog';
import { Trash2 } from 'lucide-react';
import {toast} from "sonner";
import {InvitationService} from "../../../../../services/InvitationService";
import {useState} from "react";
import { useInvitesStore } from '../../../../../store/useInvites';

export default function InvitesUserRown({
                                            id,
                                            email,
                                            role,
                                            status,
                 }) {

    const removeInvite = useInvitesStore(state => state.removeInvite);
    const [isOpen, setOpen] = useState(false);
    const getStatusBadge = (status) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-100 text-green-800 font-medium">{status}</Badge>
            case "Inactive":
                return <Badge className="bg-gray-100 text-gray-800 font-medium">{status}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

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
            const res = await InvitationService.deleteInvitation(id);
            if(res.status === 200) {
                toast.success('Invitation deleted SuccessFully');
                setOpen(false);
                removeInvite(id);
            }
        } catch (error) {
            toast.error('Failed to Delete Invitation: ', error);
        }
    }

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{email}</td>
            <td className="py-4 px-6">{getRoleBadge(role)}</td>
            <td className="py-4 px-6">{getStatusBadge(status)}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <Dialog open={isOpen} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-white h-8 w-8 text-red-500 hover:bg-red-500 hover:text-white">
                                <Trash2 size={18}/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-red-500 text-center">Danger Zone</DialogTitle>
                                <DialogDescription className="text-center">
                                    Are you sure you want to revoke this Invitation
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Input id="name" type="hidden" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Input id="username" type="hidden" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="bg-red-500" onClick={handleDelete} type="submit">Revoke</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/*<Button onClick={handleDelete} variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 size={18}/>
                    </Button>*/}
                </div>
            </td>
        </tr>
    )
}