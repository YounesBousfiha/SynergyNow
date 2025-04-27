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
            const response = await axios.post('/deals', dealData);
            return response.data;
        } catch (error) {
            console.error("Error creating deal:", error);
            throw error;
        }
    },

    async updateDeal(dealId, dealData) {
        try {
            const response = await axios.put(`/deals/${dealId}`, dealData);
            return response.data;
        } catch (error) {
            console.error("Error updating deal:", error);
            throw error;
        }
    },

    async deleteDeal(dealId) {
        try {
            const response = await axios.delete(`/deals/${dealId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting deal:", error);
            throw error;
        }
    }
}