import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetDescription,
    SheetTitle, SheetFooter, SheetClose
} from "../../../../components/ui/sheet";
import {Button} from "../../../../components/ui/button";
import {Plus, Upload} from "lucide-react";
import {Label} from '../../../../components/ui/label';
import {Input} from "../../../../components/ui/input";
import { useState } from 'react';
import {contactService} from "../../../../services/contactService";
import {toast} from "sonner";
import {useContactStore} from "../../../../store/useContact";

export default function AddContactBtn({companyId}) {

    const [firstname, SetFirstname] = useState("");
    const [lastname, SetLastname] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [jobtitle, SetJobtitle] = useState("");
    const [address, SetAddress] = useState("");
    const [imagePreview, SetImagePreview] = useState(null);

    const { addContact } = useContactStore();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                SetImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("client_companie_id", companyId);

        if(imagePreview) {
            const imageFormat = imagePreview.split(";")[0].split('/')[1];
            const base64response = await fetch(imagePreview);
            const blob = await base64response.blob();

            const file = new File([blob], 'contact-image.png', {
                type: `image/${imageFormat}`
            })

            formData.append('image', file);
        }
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        // TODO: Implemenet a validation for the form
        try {
            const response = await contactService.create(data, companyId)
            if(response.status === 200) {
                toast.success("Contact Added Successfully");
                addContact(response.data.contact);
                SetFirstname("");
                SetLastname("");
                SetEmail("");
                SetPhone("");
                SetJobtitle("");
                SetAddress("");
            }
        } catch (e) {
            toast.error("Error while Adding Contact");
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90 flex items-center gap-2">
                    <Plus size={18} />
                    Add new Contact
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add new Contact</SheetTitle>
                    <SheetDescription>
                        Create new Contact Here
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 px-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstname" className="text-right">Firstname</Label>
                            <Input
                                id="firstname"
                                className="col-span-3"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => SetFirstname(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastname" className="text-right">Lastname</Label>
                            <Input
                                id="lastname"
                                className="col-span-3"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => SetLastname(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                className="col-span-3"
                                name="email"
                                value={email}
                                onChange={(e) => SetEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <Input
                                id="phone"
                                className="col-span-3"
                                name="phone"
                                value={phone}
                                onChange={(e) => SetPhone(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jobtitle" className="text-right">Job Title</Label>
                            <Input
                                id="jobtitle"
                                className="col-span-3"
                                name="job_title"
                                value={jobtitle}
                                onChange={(e) => SetJobtitle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">Address</Label>
                            <Input
                                id="address"
                                className="col-span-3"
                                name="address"
                                value={address}
                                onChange={(e) => SetAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => document.getElementById('logo-upload').click()}
                            >
                                <Upload size={16} className="mr-2"/>
                                Upload logo
                            </Button>
                            <Input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        {imagePreview && (
                            <div className="mt-4 flex justify-center">
                                <div
                                    className="bg-gray-50 p-3 rounded-full w-32 h-32 flex items-center justify-center shadow-sm border border-gray-100">
                                    <img
                                        src={imagePreview}
                                        alt="Logo preview"
                                        className="max-w-full max-h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}