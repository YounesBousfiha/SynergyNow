import axios from '../lib/axios';

import Cookies from 'js-cookie';

export const  myCompanyService = {
    setup: async (data) => {
        try {
            return await axios.post('/setup', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization" : `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    getCompanyInfo: async (token = null) => {

        let AuthToken;
        if(token) {
            AuthToken = token
        } else {
            AuthToken = Cookies.get('jwt');
        }
        try {
            return await axios.get('/mycompany', {
                headers: {
                    'Authorization' : `Bearer ${AuthToken}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    updateCompany: (data) => {
        try {
            return axios.post('/mycompany', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}