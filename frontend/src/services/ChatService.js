import axios from '../lib/axios';
import Cookies from 'js-cookie';
import {error} from "next/dist/build/output/log";

export const chatService = {
    createChat: async (data) => {
       try {
            return axios.post('/chat', data, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
       }  catch (error) {
           throw new Error(error);
       }
    },
    getAll: async () => {
        try {
            return axios.get('/chats', {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    },
    showChat: async(chatId) => {
        try {
            return axios.get(`/chat/${chatId}`, {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {

        }
    }
}