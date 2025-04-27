import {Card, CardContent} from "../../../../../components/ui/card";
import {Button} from "../../../../../components/ui/button";
import {Eye, FilePen, MoreVertical} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "../../../../../components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../../../components/ui/dropdown-menu";
import DeleteDialog from "../../tasks/_components/DeleteDialog";
import {useState} from "react";
import {useDealsStore} from "../../../../../store/useDeals";
import {toast} from "sonner";
import {dealsService} from "../../../../../services/dealsService";
import ViewDealSheet from "./ViewDealSheet";

export default function DealCard({ id, deal}) {
    const { removeDeal, updateDeal } = useDealsStore();
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

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

    const handleUpdate = async (id, data) => {
        // Implement update functionality here
    }

    const handleView  = async (id) => {
        setIsViewOpen(true)

    }
    return (
        <>
            <ViewDealSheet
                open={isViewOpen}
                onOpenChange={setIsViewOpen}
                deal={deal}
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
                            <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
                                <FilePen size={14} />
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-2 text-red-500 hover:!text-red-600 hover:!bg-red-100 hover:cursor-pointer"
                                onClick={event => event.preventDefault()}
                            >
                                <DeleteDialog handleDelete={handleDelete} id={id}  />
                            </DropdownMenuItem>
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