import axios from '../lib/axios';
import Cookies from 'js-cookie';
import {toast} from "sonner";

export const authService = {


    login: async (userData) => {
        try {
            const response = await axios.post('/login', userData);

            if(response.data.token) {
                Cookies.set('jwt', response.data.token, {
                    secure: true,
                    expires: 1 / 24
                });

                return response.data
            }
        } catch (error) {
            console.error("Login Error:", error);
            throw new Error("Error while Login");
        }
    },
    register: async (registerData) => {
        try {
            const response = await axios.post('/register', registerData);

            return response.data;
        } catch (error) {
            console.error("Register Error:", error);
            throw new Error("Error while Registring");
        }
    },
    logout: async () => {
        try {
            toast.loading('Logout....');

            await axios.get('/logout', {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
            Cookies.remove('jwt');
            localStorage.removeItem('auth-storage')
        } catch (error) {
            console.error("Logout Error: ", error);
            throw new Error('Error while logout');
        }
    },
    forgetPassword: async (data) => {
        try {
            const res = await axios.post('/forgotpassword', data)
            return res;
        } catch (error) {
            console.error("Forget Password:", error)
            throw new Error('Error while Ask for Reset Link ')
        }
    },

    resetPassword: async (data, resetToken) => {
        try {
            const res = await axios.post(`/resetpassword/?reset_token=${resetToken}`, data);
            if(res.status !==  200) {
                return "token may be Already Used or Unexpected Error  happen";
            }
            return res;
        } catch (error) {
            //console.error("Reset Password: ", error);
            throw new Error('Error while Reseting Password');
        }
    },
    getUserRole: async () => {
        try {
            const response = await axios.post('/profile', {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
            return response.user.role_id;
        } catch (error) {
            throw new Error('Error while fetching user role');
        }
    }
}