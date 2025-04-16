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
    getCompanyInfo: () => {},
    updateCompany: () => {}
}