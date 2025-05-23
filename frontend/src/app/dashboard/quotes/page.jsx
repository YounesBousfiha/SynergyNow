"use client"
import {
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import {useState, useEffect} from "react"
import {toast} from "sonner"
import {quoteService} from "../../../services/quoteService"
import QuoteRow from "./_componenets/QuoteRow"
import { useQuoteStore} from "../../../store/useQuote";

export default function QuotesPage() {
    const { quotes, setQuotes} = useQuoteStore();
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOrder, setSortOrder] = useState("newest")
    const itemsPerPage = 10

    useEffect(() => {
        const FetchQuotes = async () => {
            try {
                const response = await quoteService.getAllQuotes();
                console.log(response.data)
                setQuotes(response.data)
            } catch (error) {
                console.error("Error fetching quotes:", error);
                toast.error("Failed to fetch quotes");
            }
        }

        FetchQuotes()
    }, []);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, sortOrder])

    const filterAndSortQuotes = (quotes, searchTerm, sortOrder) => {
        // First filter the quotes
        let filteredData = quotes.filter(quote => {
            return quote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.client_company.name.toLowerCase().includes(searchTerm.toLowerCase())
        })

        // Then sort the filtered data
        return filteredData.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB
        })
    }

    // Calculate pagination values
    const filteredQuotes = filterAndSortQuotes(quotes, searchTerm, sortOrder)
    const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentQuotes = filteredQuotes.slice(startIndex, endIndex)

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    return (
        <div className="flex-1">
            <main className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                className="pl-10 w-[300px]"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select
                            value={sortOrder}
                            onValueChange={setSortOrder}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Quotes Table */}
                <div className="bg-white rounded-md shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b text-gray-500 text-sm">
                                <th className="text-left py-4 px-6 font-medium">Title</th>
                                <th className="text-left py-4 px-6 font-medium">Company</th>
                                <th className="text-left py-4 px-6 font-medium">Total Amount</th>
                                <th className="text-left py-4 px-6 font-medium">Stage</th>
                                <th className="text-left py-4 px-6 font-medium">Created_at</th>
                                <th className="text-left py-4 px-6 font-medium">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentQuotes.map((quote) => (
                                <QuoteRow
                                    quote={quote}
                                    key={quote.id}
                                    title={quote.title}
                                    company={quote.client_company.name}
                                    amount={`$${quote.deal.amount}`}
                                    stage={quote.status}
                                    date={new Date(quote.created_at).toLocaleString()}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className="mt-4 flex items-center justify-between px-6 py-4 border-t">
                        <div className="text-sm text-gray-500">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredQuotes.length)} of {filteredQuotes.length} entries
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

