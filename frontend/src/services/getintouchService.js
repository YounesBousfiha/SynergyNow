import axios from '../lib/axios'
import Cookie from "js-cookie";



export const getintouchService =  {
    send: async (data) => {
        try {
            return await axios.post('/support/message', data);
        } catch (error) {
            console.error(error)
        }
    },
    all: async () => {
        console.log("Hello from service")
        try {
            return axios.get('/support/message', {
                headers : {
                    'Authorization': `Bearer ${Cookie.get('jwt')}`
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
}