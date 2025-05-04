"use client"

import { Search, ChevronLeft, ChevronRight} from "lucide-react"
import { Input } from "../../../components/ui/input"
import { useSearchParams } from "next/navigation";
import {useEffect, useState} from "react";
import {contactService} from "../../../services/contactService";
import ContactRow from "./_componenets/ContactRow";
import AddContactBtn from "./_componenets/AddContactBtn";
import {useContactStore} from "../../../store/useContact";
import {Button} from "../../../components/ui/button";
export default function CustomersPage() {

    const { contacts, setContacts} = useContactStore();
    const [search, setSearch] = useState("");
    const params = useSearchParams();
    const companyId = params.get('company');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(contacts.length / itemsPerPage);



    useEffect(() => {
        async function FetchContacts(companyId) {
            const response = await contactService.all(companyId);
            if(response.status === 200) {
                console.log(response.data.contacts);
                setContacts(response.data.contacts);
            }

            contacts.map(contact => {
                console.log(contact);
            })
        }

        FetchContacts(companyId)


    }, []);


    console.log("Contacts :", contacts);

    const filteredContacts = !search.trim()
        ? contacts  :
        contacts.filter(contact =>
        contact?.firstname.toLowerCase().includes(search.toLowerCase()) ||
        contact?.lastname.toLowerCase().includes(search.toLowerCase()) ||
        contact?.email.toLowerCase().includes(search.toLowerCase()
    ))

    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
            <div className="flex-1">

                {/* Content */}
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <AddContactBtn companyId={companyId} />
                        <h1 className="text-2xl font-bold">All Customers</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input className="pl-10 w-[300px]" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
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
                                {paginatedContacts.map((contact) => (
                                    <ContactRow
                                        key={contact.id}
                                        id={contact.id}
                                        company_id={contact.client_companie_id}
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
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 p-4 border-t">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? "default" : "outline"}
                                                onClick={() => setCurrentPage(page)}
                                                className="w-8"
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
    )
}

