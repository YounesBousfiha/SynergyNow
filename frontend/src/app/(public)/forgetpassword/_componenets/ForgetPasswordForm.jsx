"use client"

import { useState } from "react";
import {Label} from "../../../../components/ui/label";
import {Input} from "../../../../components/ui/input";
import { validateEmail } from "../../../../utils/Validators";
import {Button} from "../../../../components/ui/button";
import {toast} from "sonner";
import {authService} from "../../../../services/authService";
export default function ForgetPasswordForm() {


    const [ email, setEmail ] = useState("");
    const [ error, setErrors ] = useState([]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData  = new FormData(e.target);
        const data = Object.fromEntries(formData);

        toast.loading("Loading....");

        console.log(data);
        try {
            const res = await authService.forgetPassword(data)
        } catch (error) {
            console.error("Error request reset link : ", error);
            toast.error("Error while ask for Reset Password Link");
        }

        toast.dismiss();
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrors(validateEmail(e.target.value))
                        }}
                        required
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>
                <Button type="submit" className="w-full bg-[#296c5c] hover:bg-[#296c5c]/90">
                    Send Reset Link
                </Button>
            </form>
        </>
    );
}