import {Card, CardContent} from "../../../../../components/ui/card";
import {Button} from "../../../../../components/ui/button";
import {Eye, FilePen, MoreVertical, SendHorizontal} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "../../../../../components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../../../components/ui/dropdown-menu";
import DeleteDialog from "../../tasks/_components/DeleteDialog";
import {useEffect, useState} from "react";
import {useDealsStore} from "../../../../../store/useDeals";
import {toast} from "sonner";
import {dealsService} from "../../../../../services/dealsService";
import ViewDealSheet from "./ViewDealSheet";
import {quoteService} from "../../../../../services/quoteService";
import UpdateDialog from "./UpdateDialog";
import {useAuth} from "../../../../../store/useAuth";


export default function DealCard({ id, deal}) {
    const { removeDeal, updateDeal } = useDealsStore();
    const roleId = useAuth((state) => state.user?.role_id);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [open]);

    const handleDelete = async (id) => {
        try {
            const response = await dealsService.deleteDeal(id);
            if(response.status === 200) {
                toast.success("Deal deleted successfully");
                removeDeal(id);
            }
        } catch (error)  {
            toast.error("Error deleting deal");
        }
    }

    const handleQuoteSent = async (id) => {
        try {
            const response = await quoteService.sendQuote(id);
            if(response.status === 200) {
                toast.success("Quote sent successfully");
                updateDeal(deal.id, { ...deal, status: "quote_sent" });
            }
        } catch (error) {
            console.error("Error sending quote:", error);
            toast.error("Error sending quote");
        }
    }

    const handleView  = async (id) => {
        setIsViewOpen(true)

    }

    const handleUpdateDialog = () => {
        setIsUpdateOpen(true)
    }

    const handleUpdate  = async (id, data) => {
        console.log("Deal ID: ", id)
        console.log("Data: ", data)
        try {
            const response = await dealsService.updateDeal(id, data);
            console.log(response.data);
            setIsUpdateOpen(true)
        } catch (error) {
            console.error("Error updating deal: ", error);
            toast.error("Error updating deal");
        }
    }
    return (
        <>
            <ViewDealSheet
                open={isViewOpen}
                onOpenChange={setIsViewOpen}
                deal={deal}
            />

            <UpdateDialog
                handleUpdate={handleUpdate}
                deal={deal}
                id={id}
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
            />
        <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
                            <Avatar>
                                <AvatarImage src={deal?.client_company?.image} alt={deal?.client_company?.name} />
                                <AvatarFallback className="text-xs">AR</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <div className="text-sm font-medium">{deal?.client_company?.name}</div>
                            <div className="text-xs text-gray-500">{deal.title}</div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                                <MoreVertical size={14}/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => { handleView(id) } }
                            >
                                <Eye size={14} />
                                <span>View</span>
                            </DropdownMenuItem>
                            {roleId !== 3 && (
                                <>
                                    <DropdownMenuItem onClick={() => handleUpdateDialog()}>
                                        <FilePen size={14} />
                                        Update
                                    </DropdownMenuItem>
                                    {deal?.quotes[0]?.status === 'draft' && (
                                        <DropdownMenuItem
                                            className="flex items-center gap-2"
                                            onClick={() => handleQuoteSent(id)}
                                        >
                                            <SendHorizontal size={14}/>
                                            Sent Quote
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 text-red-500 hover:!text-red-600 hover:!bg-red-100 hover:cursor-pointer"
                                        onClick={event => event.preventDefault()}
                                    >
                                        <DeleteDialog handleDelete={handleDelete} id={id}  />
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={deal?.agent?.image} alt={`${deal?.agent?.firstname} ${deal?.agent?.lastname}`}/>
                        <AvatarFallback className="text-xs">{`${deal?.agent?.firstname.charAt(0)} ${deal?.agent?.lastname.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">${deal.amount}</span>
                </div>
            </CardContent>
        </Card>
        </>
    )
}