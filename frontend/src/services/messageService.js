"use client"

import axios from '../lib/axios';
import Cookies from "js-cookie";

export const messageService = {
    sendMessage: async (data, chatId) => {
        try {
            return await axios.post(`/messages/${chatId}`, data, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}