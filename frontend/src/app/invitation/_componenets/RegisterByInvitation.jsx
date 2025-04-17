"use client"

import {Label} from "../../../components/ui/label";
import {Input} from "../../../components/ui/input";
import {Button} from "../../../components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidName, validateEmail } from "../../../utils/Validators"
import { RegisterSchema } from '../../../schema/RegisterSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "sonner";
import { InvitationService} from "../../../services/InvitationService";

export default function RegisterForm({ token}) {
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        email: ""
    });

    const customSchema = RegisterSchema.pick({
        firstname: true,
        lastname: true,
        password: true,
        confirmPassword: true
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        const result = customSchema.safeParse(data);
        console.log(data);
        if(result.data.password !== result.data.confirmPassword) {
            return toast.error("Password Mismatch");
        }

        if(result.success) {

            try {
                await InvitationService.SignUpWithInvitation(result.data, token);
                toast.success("Sign Up succesfully");
                router.push('/login');
            } catch (error) {
                return toast.error(error);
            }
        } else {
            return toast.error(result.error.errors);
        }

    }
    return (
        <>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstname">First name</Label>
                                <Input id="firstname" name="firstname" onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setError(prevState => ({
                                        ...prevState,
                                        firstname: isValidName(e.target.value)
                                    }))
                                }}
                                       required/>
                                {error.firstname && (
                                    <p className="text-red-500 text-sm mt-1">{error.firstname}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname" name="lastname" onChange={(e) => {
                                    setLastName(e.target.value);
                                    setError(prevState => ({
                                        ...prevState,
                                        lastname: isValidName(e.target.value)
                                    }));
                                }}
                                       required/>
                                {error.lastname && (
                                    <p className="text-red-500 text-sm mt-1">{error.lastname}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password"
                                   required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Password confirmation</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-[#296c5c] hover:bg-[#296c5c]/90 mt-4">
                            SignUp
                        </Button>
                    </form>
                </>
                );
                }