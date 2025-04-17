"use client"

import { useState } from "react"
import Image from "next/image"
import { Building2, Upload, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import {myCompanyService} from "../../services/myCompanyServices";
import {toast} from "sonner";
import { useRouter } from 'next/navigation';


export default function InfoSetupPage() {

    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const router = useRouter();
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target?.result) {
                setPreviewImage(e.target.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0])
        }
    }

    const removeImage = () => {
        setPreviewImage(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({
            companyName,
            companyDescription,
            hasLogo: !!previewImage,
        });

        const imageFormat = previewImage.split(";")[0].split('/')[1];
        const formData = new FormData();
        formData.append('name', companyName);
        formData.append('description', companyDescription);

        if(previewImage) {
            const base64Reponse = await fetch (previewImage);
            const blob = await base64Reponse.blob();

            const file = new File([blob], 'companu-logo.png', {
                type: `image/${imageFormat}`
            });

            formData.append('image', file);
        }
        try {
            const response = await myCompanyService.setup(formData);
            toast.success('Company Profile Setup SuccessFully');
            router.push('/dashboard');
        } catch(error) {
            console.error(error);
            toast.error(error);
        }
    }
    return (
        <>
            <main className="p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Company Profile Setup</h1>
                    <p className="text-gray-500 mb-8">
                        Set up your company profile to personalize your experience and help your team and clients
                        identify your
                        organization.
                    </p>

                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                            <CardDescription>
                                Enter your company details and upload a logo to complete your profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input
                                        id="companyName"
                                        placeholder="Enter your company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Company Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Briefly describe your company, its mission, and services"
                                        rows={5}
                                        value={companyDescription}
                                        onChange={(e) => setCompanyDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <Label>Company Logo</Label>
                                    {!previewImage ? (
                                        <div
                                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 ${
                                                isDragging ? "border-[#06ae6f] bg-[#06ae6f]/5" : "border-gray-300"
                                            }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            <div className="mb-4 bg-[#06ae6f]/10 p-3 rounded-full">
                                                <Upload className="h-6 w-6 text-[#06ae6f]"/>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium">
                                                    Drag and drop your logo here, or{" "}
                                                    <label className="text-[#06ae6f] cursor-pointer">
                                                        browse
                                                        <input type="file" className="hidden" accept="image/*"
                                                               onChange={handleFileInputChange}/>
                                                    </label>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG or SVG (max.
                                                    5MB)</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative border rounded-lg p-4 bg-white">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white/90 rounded-full"
                                                onClick={removeImage}
                                            >
                                                <X size={16}/>
                                            </Button>
                                            <div className="flex justify-center">
                                                <div className="relative h-40 w-40">
                                                    <Image
                                                        src={previewImage || "/placeholder.svg"}
                                                        alt="Company logo preview"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Preview */}
                                <div className="border rounded-lg p-6 bg-white">
                                    <h3 className="font-medium mb-4">Preview</h3>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center overflow-hidden">
                                            {previewImage ? (
                                                <div className="relative h-full w-full">
                                                    <Image
                                                        src={previewImage || "/placeholder.svg"}
                                                        alt="Company logo"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <Building2 className="h-8 w-8 text-gray-400"/>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{companyName || "Your Company Name"}</p>
                                            <p className="text-sm text-gray-500">
                                                {companyDescription
                                                    ? companyDescription.length > 100
                                                        ? `${companyDescription.substring(0, 100)}...`
                                                        : companyDescription
                                                    : "Your company description will appear here"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-[#296c5c] hover:bg-[#296c5c]/90">
                                        Save Company Profile
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}