"use client"

import { useState } from "react";

export default function Settings() {
    const [activeView, setActiveView] = useState('settings');

    return (
        <>
            <div className="mb-4">
                <button
                    onClick={() => setActiveView('settings')}
                    className={`mr-2 px-4 py-2 rounded ${activeView === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Settings
                </button>
                <button
                    onClick={() => setActiveView('usersManager')}
                    className={`px-4 py-2 rounded ${activeView === 'usersManager' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    User Manager
                </button>
            </div>

            {activeView === 'settings' && (
                <h1>Hello From Settings</h1>
            )}
            {activeView === 'usersManager' && (
                <h1>Hello UserManager</h1>
            )}
        </>
    );
}