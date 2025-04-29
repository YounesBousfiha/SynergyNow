import {Badge} from "../../../../components/ui/badge";
import {Button} from "../../../../components/ui/button";
import {Eye, Trash2} from "lucide-react";
import DeleteDialog from "./DeleteDialog";
import {quoteService} from "../../../../services/quoteService";
import {toast} from "sonner";
import { useQuoteStore } from "../../../../store/useQuote";
export default function QuoteRow({
                      quote,
                      title,
                      company,
                      amount,
                      stage,
                      date,
                  }) {

    const { removeQuote } = useQuoteStore();
    const getStageBadge = (stage) => {
        switch (stage) {
            case "sent":
                return <Badge className="bg-[#a8e6cf] text-[#296c5c] font-medium">{stage}</Badge>
            case "draft":
                return <Badge className="bg-blue-100 text-blue-800 font-medium border border-blue-200">{stage}</Badge>
            default:
                return <Badge>{stage}</Badge>
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await quoteService.deleteQuote(id);
            if (response.status === 200) {
                removeQuote(id);
                toast.success("Quote deleted successfully");
            } else {
                toast.error("Failed to delete quote");
            }

        } catch (error) {
            console.error("Error deleting quote:", error);
        }

    }

    return (
        <>
            <tr className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{title}</td>
                <td className="py-4 px-6">{company}</td>
                <td className="py-4 px-6">{amount}</td>
                <td className="py-4 px-6">{getStageBadge(stage)}</td>
                <td className="py-4 px-6">{date}</td>
                <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Eye size={18} />
                        </Button>
                        <DeleteDialog id={quote.id} handleDelete={handleDelete} />
                    </div>
                </td>
            </tr>
        </>
    )
}