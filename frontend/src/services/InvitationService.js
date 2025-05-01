"use client"

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
    getAllInvitation: async () => {
        try {
            return await axios.get('/invite', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteInvitation: async (InvitationId) => {
        try {
            return axios.delete(`/invite/revoke/${InvitationId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`

                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },

    SignUpWithInvitation: async (UserData, token) => {
        try {
            return await axios.post(`/invitation/${token}`, UserData);
        } catch (error) {
            throw new Error(error);
        }
    }
}