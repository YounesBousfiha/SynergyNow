import axios from '../lib/axios'
import Cookies from "js-cookie";



export const quoteService = {
    sendQuote: async (id) => {
    try {
        const response = await axios.post(`/quote/${id}/send`, {}, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error sending quote:", error);
        throw error;
    }
}
}