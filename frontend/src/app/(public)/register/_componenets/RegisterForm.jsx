"use client"

import {Label} from "../../../../components/ui/label";
import {Input} from "../../../../components/ui/input";
import {Button} from "../../../../components/ui/button";

export default function RegisterForm() {


    const handleChange = () => {}


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
                        <Input id="firstName" name="firstName" onChange={handleChange}
                               required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" name="lastName" onChange={handleChange}
                               required/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email"  onChange={handleChange}
                           required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password"
                           onChange={handleChange} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Password confirmation</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
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