"use client"

import {Label} from "../../../../components/ui/label";
import {Input} from "../../../../components/ui/input";
import {Button} from "../../../../components/ui/button";
import { useState } from "react";
import { RegisterSchema } from "../../../../schema/RegisterSchema";
import { validateForm } from "../../../../utils/FormValidation";
import {toast} from "sonner";
import {authService} from "../../../../services/authService";
import { useRouter } from "next/navigation";
import { isValidName, validateEmail } from "../../../../utils/Validators"

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        email: ""
    });

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log(data);
        const { success, validData } = validateForm(data, RegisterSchema);
        console.log(success);
        if(success) {
            try {
                const res = await authService.register(validData)
                router.push('/login');
                console.log(validData);
            } catch (error) {
                toast.error("Error while Registring");
                router.push('/register')
            }
            toast.dismiss();
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
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email"  onChange={(e) => {
                        setEmail(e.target.value);
                        setError(prevState => ({
                            ...prevState,
                            email: validateEmail(e.target.value)
                        }));
                    }}
                           required/>
                    {error.email && (
                        <p className="text-red-500 text-sm mt-1">{error.email}</p>
                    )}
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