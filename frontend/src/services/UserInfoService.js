import axios from '../lib/axios'
import Cookies from "js-cookie";

export const userInfoService = {
    update: async (data) => {
        try {
            return await axios.post('/profile', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    },
}