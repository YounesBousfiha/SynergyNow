import axios from '../lib/axios';
import Cookie from 'js-cookie';

export const getStatistiques = async () => {
    try {
        return await axios.get('/dashboard/info', {
            headers: {
                'Authorization' : `Bearer ${Cookie.get('jwt')}`,
            },
        });
    } catch (error) {
        console.error('Error fetching statistiques:', error);
        throw error;
    }
}