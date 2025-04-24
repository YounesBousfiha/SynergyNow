"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Button} from "../../../components/ui/button";
import {Input} from "../../../components/ui/input";
import { Mail } from 'lucide-react';
import { useAuth } from "../../../store/useAuth";
import { useState, useEffect } from "react";
import {toast} from "sonner";
import {userInfoService} from "../../../services/UserInfoService";
import {authService} from "../../../services/authService";
export default function AccountSetting() {

    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    console.log(user);

    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log(data);

        // TODO: Validation
        // TODO: Start working on the Update info
        // TODO: start by changing the controller one method for updateInfo
        // TODO: make/search for the change password method
        try {
            const response = await userInfoService.update(data);
            console.log(response);
        } catch (e) {
            console.error(e);
            toast.error("Failed to update user information");
        }
    }
    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await authService.changePassword(data);
            if(response.status === 200) {
                toast.success("Password updated successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update password");
        }
    }

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#296c5c]"></div>
            </div>
        );
    }

    // TODO: while updating the profile, we need to update the user state in the store as well
    return (
        <>
            <main className="p-8">
                <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

                <div className="bg-white rounded-md shadow-sm p-8">
                    {/* Profile Section */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.image || "https://res.cloudinary.com/dashccxm0/image/upload/v1744244164/Ellipse_4_azkyht.png"} alt={`${user?.firstname} ${user?.lastname}`}/>
                                <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-semibold">{`${user?.firstname} ${user?.lastname}`}</h2>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleUpdateInfo}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block font-medium">
                                    Firstname
                                </label>
                                <Input
                                    id="fullName"
                                    name="firstname"
                                    placeholder="Your First Name"
                                    className="bg-[#f9f9f9] border-0"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastname" className="block font-medium">
                                    Lastname
                                </label>
                                <Input
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Your Last Name"
                                    className="bg-[#f9f9f9] border-0"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block font-medium">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="bg-[#f9f9f9] border-0"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-6">
                            <Button type="submit" className="bg-[#296c5c] hover:bg-[#296c5c]/90">Update Info</Button>
                        </div>
                    </form>
                    {/* Password Section */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                        <form onSubmit={handleUpdatePassword}>
                            <div className="space-y-3">
                            <div className="space-y-3">
                                <label htmlFor="oldpassword" className="block font-medium">
                                    Old Password
                                </label>
                                <Input
                                    id="oldpassword"
                                    type="password"
                                    name="old_password"
                                    placeholder="Your Old Password"
                                    className="bg-[#f9f9f9] border-0"/>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="password" className="block font-medium">
                                    New Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="new_password"
                                    placeholder="Your New Password"
                                    className="bg-[#f9f9f9] border-0"/>
                            </div>

                            <div className="space-y-3 mt-4">
                                <label htmlFor="confirmPassword" className="block font-medium">
                                    Confirm Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Confirm Your New Password"
                                    className="bg-[#f9f9f9] border-0"/>
                            </div>
                            <div className="flex items-center justify-end">
                                <Button type="submit" className="bg-[#296c5c] hover:bg-[#296c5c]/90">Change
                                    Password</Button>
                            </div>
                            </div>
                        </form>
                    </div>

                    {/* Email Section */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4">My email Address</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 rounded-full p-3">
                                <Mail className="h-5 w-5 text-blue-500"/>
                            </div>
                            <div>
                                <p className="font-medium">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}