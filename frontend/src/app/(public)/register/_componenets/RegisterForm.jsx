"use client"

import {Label} from "../../../../components/ui/label";
import {Input} from "../../../../components/ui/input";
import {Button} from "../../../../components/ui/button";
import { useState } from "react";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });


    const isValidName = (value) => {
        if (/\d/.test(value)) return "Numbers are not allowed";
        if(!value) return "Field is Required";
        if(value.length < 4) return "the Content must be at least 4 characters";
        return "";
    }

    const validateEmail = (value) => {

        const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!value) {
            return "Email Field is Required";
        }

        if(!EmailRegex.test(value)) {
            return "Please Enter a Valid Email"
        }

        return "";
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" name="firstName" onChange={(e) => {
                            setFirstName(e.target.value);
                            setError(prevState => ({
                                ...prevState,
                                firstName: isValidName(e.target.value)
                            }))
                        }}
                               required/>
                        {error.firstName && (
                            <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" name="lastName" onChange={(e) => {
                            setLastName(e.target.value);
                            setError(prevState => ({
                                ...prevState,
                                lastName: isValidName(value)
                            }));
                        }}
                               required/>
                        {error.lastName && (
                            <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
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