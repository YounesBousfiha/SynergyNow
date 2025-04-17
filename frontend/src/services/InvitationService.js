import axios from '../lib/axios';
import Cookies from 'js-cookie';

export const InvitationService = {
    inviteUser: async (data) => {
        try {
            return await axios.post('/invite', data, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    getAllInvitation: () => {},
    deleteInvitation: (InvitationId) => {},
    SignUpWithInvitation: (UserData) => {}
}