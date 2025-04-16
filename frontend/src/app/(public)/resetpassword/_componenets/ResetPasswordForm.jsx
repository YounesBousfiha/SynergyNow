"use client"

import { authService } from '../../../../services/authService';
import { Label } from '../../../../components/ui/label';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordForm() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const  resetToken = searchParams.get('reset_token');

    if(!resetToken) return (<><div>No Reset Token is Set </div></>);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if(data.password === data.password_confirmation) {
            try {
                const res = await authService.resetPassword(data, resetToken);
                if(res.status === 200) {
                    setTimeout(() => {
                        toast.success(res.data.message);
                    }, 2000);
                    router.push('/login');
                }
            } catch (error) {
                toast.error('Failed to Reset the password due to expired Token or Unexpected Error');
            }
        } else {
            toast.error('Passwords Mismatch');
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <Label htmlFor="password">Password: </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="New Password ..."
                    />
                    <Label htmlFor="password_confirmation">Password Confirmation: </Label>
                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="Password Confirmation ..."
                    />
                    <div>
                        <Button type="submit" className="w-full bg-[#296c5c] hover:bg-[#296c5c]/90">Set New Password</Button>
                    </div>
                </div>
            </form>
        </>
    );
}