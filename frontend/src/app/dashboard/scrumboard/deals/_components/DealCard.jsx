import {Card, CardContent} from "../../../../../components/ui/card";
import {Button} from "../../../../../components/ui/button";
import {MoreVertical} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "../../../../../components/ui/avatar";

export default function DealCard({ id, deal}) {
    return (
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
                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                        <MoreVertical size={14} />
                    </Button>
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
    )
}