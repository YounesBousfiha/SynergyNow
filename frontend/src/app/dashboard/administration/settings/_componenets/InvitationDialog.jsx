import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../../../components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../../../components/ui/select"
import {Button} from "../../../../../components/ui/button";
import {Label} from "../../../../../components/ui/label";
import {Input} from "../../../../../components/ui/input";
import {useState} from "react";
import { InvitationService } from '../../../../../services/InvitationService';
import {toast} from "sonner";
import { useInvitesStore } from "../../../../../store/useInvites";

export default function InvitationDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const { invites, setInvites } = useInvitesStore();
    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log(data);

        setIsOpen(false);
        try {
            const response = await InvitationService.inviteUser(data);
            toast.success("Invitation send SuccessFully");
            const InvitationData = Array.isArray(response.data.invitation)
                ? response.data.invitation
                : [response.data.invitation];
            setInvites(InvitationData);
        } catch (error) {
            console.error(error);
            toast.error("Error while Invite new User")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={handleOpen} className="text-white bg-[#06ae6f] hover:bg-[#296c5c] hover:text-white" variant="outline">Invite User</Button>
            </DialogTrigger>
            {isOpen && (
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" name="email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Role
                        </Label>
                        <Select name="role_id">
                            <SelectTrigger className="col-span-3">
                                <SelectValue  placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    <SelectItem value="2">Admin</SelectItem>
                                    <SelectItem value="3">Agent</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="bg-[#06ae6f]" type="submit">Save changes</Button>
                </DialogFooter>
                </form>
            </DialogContent>)}
        </Dialog>
    );
}