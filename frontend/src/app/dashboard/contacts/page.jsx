"use client"

import { Search, Plus} from "lucide-react"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { useSearchParams } from "next/navigation";
import {useEffect, useState} from "react";
import {contactService} from "../../../services/contactService";
import ContactRow from "./_componenets/ContactRow";
import AddContactBtn from "./_componenets/AddContactBtn";
import {useContactStore} from "../../../store/useContact";
export default function CustomersPage() {

    const { contacts, setContacts} = useContactStore();
    const [search, setSearch] = useState("");
    const params = useSearchParams();
    const companyId = params.get('company');


    useEffect(() => {
        async function FetchContacts(companyId) {
            const response = await contactService.all(companyId);
            if(response.status === 200) {
                console.log(response.data.contacts[0].job_title);
                setContacts(response.data.contacts);
            }
        }

        FetchContacts(companyId)
    }, []);


    const filteredContacts = !search.trim()
        ? contacts  :
        contacts.filter(contact =>
        contact.firstname.toLowerCase().includes(search.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase())
    )
    return (
            <div className="flex-1">

                {/* Content */}
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <AddContactBtn companyId={companyId} />
                        <h1 className="text-2xl font-bold">All Customers</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input className="pl-10 w-[300px]" placeholder="Search" />
                        </div>
                    </div>

                    {/* Customers Table */}
                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Firstname</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Lastname</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Job title</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Company</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Phone Number</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Email</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Status</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-500">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredContacts.map((contact) => (
                                    <ContactRow
                                        key={contact.id}
                                        firstname={contact.firstname}
                                        lastname={contact.lastname}
                                        company={contact.client_company.name}
                                        jobtitle={contact.job_title}
                                        phone={contact.phone}
                                        email={contact.email}
                                        country={contact.country}
                                        status={contact.status}
                                    />
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="py-4 px-6 border-t flex items-center justify-center">
                            {/*<div className="flex items-center space-x-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <span className="sr-only">Previous page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 bg-[#06ae6f] text-white border-[#06ae6f]">
                                    1
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    2
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    3
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    4
                                </Button>
                                <span>...</span>
                                <Button variant="outline" size="sm" className="h-8 w-8">
                                    40
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <span className="sr-only">Next page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </Button>
                            </div>*/}
                        </div>
                    </div>
                </main>
            </div>
    )
}

