"use client"

import {  useSearchParams } from  'next/navigation';
import { Suspense } from 'react'
import RegisterByInvitation from './_componenets/RegisterByInvitation'


export default function RegisterByInvitationPage() {

    const seachParam = useSearchParams();

    const base64data = seachParam.get('invitation_token');

    const [companyName, invitation_token] = atob(base64data).split(':');
    // TODO: Move the useSearchParam inside the RegisterBy Invitation componenet  & wrap that component with Suspense
    return (
        <>
            <Suspense fallback={(<div>...</div>)}>
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg mx-4 my-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Register to { companyName }</h1>
                        <p className="text-gray-600 mb-6">Complete your registration</p>
                    </div>
                    <RegisterByInvitation token={invitation_token} />
                </div>
            </main>
            </Suspense>
        </>
    );
}