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
    },
    deleteQuote: async (id) => {
        try  {
            return await axios.delete(`/quote/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`
            }
        })
        } catch (error) {
            console.error("Error deleting quote:", error);
            throw error;
        }
    },
    exportPDF : async (id) => {
        try {
            return await axios.get(`/quote/${id}/export`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Error exporting PDF:", error);
            throw error;
        }
    }
}