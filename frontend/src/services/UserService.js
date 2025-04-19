import axios from '../lib/axios';
import Cookies from "js-cookie";

export const userService = {
    getAllUsers: async () => {
        try {
            return await axios.get('/users', {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    getUserDetails: async (userId) => {
        try {
            return await axios.get(`/users/${userId}`, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error)
        }
    },
    changeUserRole: async (userId, data) => {
        try {
            return await axios.patch(`/user/${userId}`, data,{
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteUser: async (userId) => {
        try {
            return await axios.delete(`/user/${userId}`, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}