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
    },
    getAllQuotes: async () => {
        try {
            return await axios.get('/quotes', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Error fetching all quotes:", error);
            throw error;
        }
    }
}