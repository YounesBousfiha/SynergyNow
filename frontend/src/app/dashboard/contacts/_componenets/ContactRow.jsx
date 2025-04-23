import {Badge} from "../../../../components/ui/badge";
import {MoreVertical, Eye, Trash2, PencilIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {toast} from "sonner";
import { useContactStore } from "../../../../store/useContact";
import {contactService} from "../../../../services/contactService";
import { useState } from 'react'
import {EditContactSheet} from "./EditContactSheet";
export default function ContactRow({
                         id,
                         company_id,
                         firstname,
                         lastname,
                         company,
                         phone,
                         email,
                         jobtitle,
                         status,
                     }) {

    const { removeContact } = useContactStore();
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

    const onDelete = async (id, company_id) => {
        try {
            const response = await  contactService.delete(id, company_id);
            if(response.status === 200) {
                toast.success("Contact Deleted Successfully");
                removeContact(id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while Deleting contact");
        }
    }
    return (
        <>
        <tr className="border-b hover:bg-gray-50">
            <td className="py-4 px-6">{firstname}</td>
            <td className="py-4 px-6">{lastname}</td>
            <td className="py-4 px-6">{jobtitle}</td>
            <td className="py-4 px-6">{company}</td>
            <td className="py-4 px-6">{phone}</td>
            <td className="py-4 px-6">{email}</td>
            <td className="py-4 px-6">
                <Badge
                    className={`${status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} font-medium`}
                >
                    {status}
                </Badge>
            </td>
            <td className="py-4 px-6">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <MoreVertical className="h-5 w-5 text-gray-500 hover:text-gray-700"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsEditSheetOpen(true)}>
                            <PencilIcon className="mr-2 h-4 w-4"/>
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(id, company_id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                            <Trash2 className="mr-2 h-4 w-4"/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>

        </tr>

    <EditContactSheet
        isOpen={isEditSheetOpen}
        onClose={() => setIsEditSheetOpen(false)}
        contact={{
            id,
            company_id,
            firstname,
            lastname,
            company,
            phone,
            email,
            jobtitle,
            status,
        }}
    />
        </>
    )
}