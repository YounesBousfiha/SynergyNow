"use client"

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
                    expires: 1
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
    changePassword: async (data) => {
        try {
            return axios.patch('/changepassword', data, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Change Password Error:", error);
            throw new Error('Error while changing password');
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
    }
}