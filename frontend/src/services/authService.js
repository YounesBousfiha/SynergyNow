import axios from '../lib/axios';
import Cookies from 'js-cookie';
import {toast} from "sonner";

export const authService = {


    login: async (userData) => {
        try {
            const response = await axios.post('/login', userData);

            if(response.data.token) {
                Cookies.set('jwt', response.data.token, {
                    secure: true
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
    resetPassword: () => {}
}