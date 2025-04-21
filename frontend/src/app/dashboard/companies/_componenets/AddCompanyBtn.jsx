"use client"

import {Button} from "../../../../components/ui/button";
import {Plus, Upload} from "lucide-react";
import {useEffect, useState} from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader, SheetTitle,
    SheetTrigger
} from "../../../../components/ui/sheet";
import {Label} from "@radix-ui/react-label";
import {Input} from "../../../../components/ui/input";
import {Textarea} from "../../../../components/ui/textarea";
import { AddCompanySchema} from "../../../../schema/AddCompanySchema";
import {toast} from "sonner";
import {companyService} from "../../../../services/companyService";
import { useCompanyStore } from "../../../../store/useCompany"

export default function AddCompanyBtn() {
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName ] = useState("");
    const [description, setDescription] = useState("");
    const [industry, setIndustry] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");

    const {  setClients, addClient} = useCompanyStore();


    useEffect(() => {
        async function fetchData () {
            try {
                const response  = await companyService.all();
                console.log(response.data.clientCompanies);
                setClients(response.data.clientCompanies);
            } catch (e) {
                toast.error(e.message())
            }
        }

        fetchData()
    }, []);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const imageFormat = imagePreview.split(";")[0].split('/')[1];
        formData.append('name', name);
        formData.append('description', description);
        formData.append('industry', industry);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('website', website);
        if(imagePreview) {
            const base64response = await fetch(imagePreview);
            const blob = await base64response.blob();

            const file = new File([blob], 'company-logo.png', {
                type: `image/${imageFormat}`
            })
            formData.append('image', file);
        }

        try {
            const response = await companyService.create(formData);
            console.log(response.data.message);
            addClient(response.data.message);
            toast.success("Client Added Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error while add new Company ");
        }
    }

            return (
                <>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90 flex items-center gap-2">
                                <Plus size={18} />
                                Add new Company
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Add New Company</SheetTitle>
                                <SheetDescription>
                                    Create new Client Company Here
                                </SheetDescription>
                            </SheetHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4 px-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={name}
                                            className="col-span-3"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" name="description" className="text-right">
                                            Description
                                        </Label>
                                        <Textarea
                                            className="col-span-3"
                                            id="description"
                                            name="description"
                                            value={description}
                                            placeholder="Type your message here."
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="industry" className="text-right">
                                            Industry
                                        </Label>
                                        <Input
                                            id="industry"
                                            name="industry"
                                            className="col-span-3"
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                        />

                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="address" className="text-right">
                                            Address
                                        </Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            className="col-span-3"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />

                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={email}
                                            className="col-span-3"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone" className="text-right">
                                            Phone
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={phone}
                                            className="col-span-3"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />

                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="website" className="text-right">
                                            Website
                                        </Label>
                                        <Input
                                            id="website"
                                            name="website"
                                            value={website}
                                            className="col-span-3"
                                            onChange={(e) => setWebsite(e.target.value)}
                                        />

                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="logo" className="text-right">
                                            Logo
                                        </Label>
                                        <div className="col-span-3">
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
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Save changes</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </form>
                        </SheetContent>
                    </Sheet>
                </>
            );
}