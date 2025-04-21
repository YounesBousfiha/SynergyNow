import axios from '../lib/axios';
import Cookies from "js-cookie";

export const companyService = {
    create: async (data) => {
        try {
            return await axios.post('/client', data, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    },
    all: async ()  => {
        try {
            return axios.get('/clients', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    },
    show: async (id) => {
        try {
            return axios.get(`/client/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    },
    delete: async (id) => {
        try {
            return axios.delete(`/client/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    },
    update: async (id, data) => {
        try {
            return axios.put(`/client/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}