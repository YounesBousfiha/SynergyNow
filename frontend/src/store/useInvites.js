import { create } from 'zustand';


export const useInvitesStore = create(
    (set) => (
        {
            invites: [],
            setInvites: (invites) => set(() => ({
                invites: invites
            })),
            removeInvite: (id) => set((state) => (
                {
                    invites: state.invites.filter((invite) => invite.id !== id)
                }
            ))
        }
    ));