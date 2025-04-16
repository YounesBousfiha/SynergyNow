"use client"
import Link from "next/link";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import { authService } from '../../../../services/authService';
import { useAuth} from "../../../../store/useAuth";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {validateForm} from "../../../../utils/FormValidation";
import { LoginSchema } from "../../../../schema/LoginSchema";
import { validateEmail } from "../../../../utils/Validators";
export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        toast.loading('Loading....');
        console.log(data);
        const { success, validData } = validateForm(data, LoginSchema);
        if(success) {
            try {
                const res = await authService.login(validData);
                if(res.token) {
                    toast.success('Logged In Succefully');
                    login(res.user);
                    if(res.user.employes_at) {
                        router.push('/dashboard');
                    } else {
                        router.push('/info-setup');
                    }
                }
            } catch(error) {
                toast.error('Failed to Login');
                router.push('/login')
            }
            toast.dismiss();
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="text-end hover:text-[#296c5c]">
                    <Link  href={'/forgetpassword'}> Forget Password ?</Link>
                </div>
                <Button type="submit" className="w-full bg-[#296c5c] hover:bg-[#296c5c]/90">
                    SignIn
                </Button>
            </form>
        </>
    );
}