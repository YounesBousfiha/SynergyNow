import axios from '../lib/axios';
import Cookies from "js-cookie";


export const dealsService = {
    async getDeals() {
        try {
            const response = await axios.get('/deals', {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching deals:", error);
            throw error;
        }
    },

    async createDeal(dealData) {
        try {
            return await axios.post('/deal', dealData, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('jwt')}`,
                }
            });
        } catch (error) {
            console.error("Error creating deal:", error);
            throw error;
        }
    },

    async updateDeal(dealId, dealData) {
        try {
            return  await axios.put(`/deal/${dealId}`, dealData, {
                headers : {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Error updating deal:", error);
            throw error;
        }
    },

    async deleteDeal(dealId) {
        try {
            return  await axios.delete(`/deal/${dealId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Error deleting deal:", error);
            throw error;
        }
    }
}