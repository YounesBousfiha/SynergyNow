"use client"

import {Card, CardContent, CardHeader} from "../../../../../components/ui/card";
import {Button} from "../../../../../components/ui/button";
import {AlarmClock, MoreVertical, Eye, FilePen } from "lucide-react";
import {Badge} from "../../../../../components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "../../../../../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../../components/ui/dropdown-menu";
import {taskService} from "../../../../../services/taskService";
import { useTasksStore } from "../../../../../store/useTasks";
import {toast} from "sonner";
import { useState, useEffect} from "react";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";
export default function TaskCard({ id, title, due_date, priority }) {

    const { removeTask, updateTask } = useTasksStore();
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const handleDelete = async (id) => {
        try {
            const response = await taskService.deleteTask(id);
            console.log(response)
            if(response.status === 200) {
                toast.success("Task deleted successfully");
                removeTask(id);
            }
        } catch (error) {
            toast.error("Error deleting task");
        }
    }

    const handleUpdate = async (id, data) => {
        try {
            const response = await taskService.updateTask(id, data);
            if(response.status === 200) {
                toast.success("Task updated successfully");
                updateTask(id, data);
                setIsUpdateOpen(false);
            }
        } catch (error) {
            console.error("Error updating task: ", error);
            toast.error("Error updating task");
        }
    }
    const handleView  = async (id) => {
        console.log("View task with id: ", id)

    }


    return (
        <>
            <UpdateDialog
                handleUpdate={handleUpdate}
                id={id}
                task={{ title, due_date, priority }}
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
            />
        <Card className="bg-white shadow-sm">
            <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between space-y-0">
                <h4 className="text-sm font-medium">{title}</h4>
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

            </CardHeader>
            <CardContent className="p-3 pt-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500">
                        {/* Change colors based on status */}
                        <span className={`text-sm  p-1 rounded-sm font-bold
                        ${priority === 'medium' ? 'text-yellow-600 bg-yellow-300'
                            : priority === 'high' ? 'text-orange-600 bg-orange-300' : 'text-green-600 bg-green-300'  }`}
                        >{priority}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge
                            className="bg-red-100 text-red-600 px-2 py-0.5 h-5 text-xs font-medium flex items-center gap-1">
                            <AlarmClock size={12}/>
                            {new Date(due_date).toLocaleDateString('en-GB')}
                        </Badge>
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Assignee"/>
                            <AvatarFallback className="text-xs">AR</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
    )
}