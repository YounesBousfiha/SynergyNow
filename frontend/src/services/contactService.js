"use client"

import axios from '../lib/axios';
import Cookies from "js-cookie";


export const contactService = {
    create: async (data, companyId) => {
        try {
            return await axios.post(`/client/${companyId}/contact`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    },
    all: async (companyId)  => {
        try {
            return axios.get(`/client/${companyId}/contacts`, {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    },
    show: async (id) => {
        try {
            return axios.get(`/contact/${id}`, {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    },
    delete: async (id, company_id) => {
        try {
            return axios.delete(`/client/${company_id}/contact/${id}`, {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    },
    update: async (id, data, company_id) => {
        try {
            return axios.put(`/client/${company_id}/contact/${id}`, data, {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}