"use client"
import { Dialog,
    DialogFooter,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "../../../../../components/ui/dialog";
import { Label} from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import {useEffect, useState} from "react";
import {Select, SelectTrigger, SelectItem, SelectContent, SelectValue} from "../../../../../components/ui/select";
import {FilePen, Trash2} from "lucide-react";
import {userService} from "../../../../../services/UserService";

export default function UpdateDialog({handleUpdate, id, task, open, onOpenChange }) {
    //const [isOpen, setIsOpen] = useState(false);

    const [assignedTo, setAssignedTo] = useState(task?.assigned_to || "");
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState(task?.priority || "");
    const [status, setStatus] = useState(task?.status || "");
    const [due_date, setDueDate] = useState(task?.due_date || "");

    useEffect(() => {
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [open]);

    useEffect(() => {

        async function FetchUsers() {
            try {
                const response = await userService.getAllUsers();
                if (response.status === 200) {
                    setUsers(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        }

        FetchUsers();
    }, [])


    const handleUnassign = async () => {
        const data = {
            ...task,
            assigned_to: null
        };
        await handleUpdate(id, data);
        setAssignedTo("");
    }

    // Format the date for the input field if it exists
    useEffect(() => {
        if (task?.due_date) {
            const date = new Date(task.due_date);
            const formattedDate = date.toISOString().split('T')[0];
            setDueDate(formattedDate);
        }
    }, [task]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id,
            title,
            description,
            priority,
            due_date,
            status,
            assigned_to: assignedTo
        };

        await handleUpdate(id, data);
        onOpenChange(false)
    }



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you're done. </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">Priority</Label>
                            <Select
                                value={priority}
                                onValueChange={setPriority}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select priority"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select
                                value={status}
                                onValueChange={setStatus}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                    <SelectItem value="todo">Todo</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="in_review">In Review</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="due_date" className="text-right">Due Date</Label>
                            <Input
                                id="due_date"
                                type="date"
                                className="col-span-3"
                                value={due_date}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assignee" className="text-right">Assignee</Label>
                            <div className="col-span-3 flex gap-2">
                                {task?.assigned_to ? (
                                    <>
                                        <span className="flex-1 py-2">
                                            {`${task.assigned_to.firstname} ${task.assigned_to.lastname}`}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={handleUnassign}
                                            className="px-3"
                                        >
                                            Unassign
                                        </Button>
                                    </>
                                ) : (
                                    <Select
                                        value={assignedTo}
                                        onValueChange={setAssignedTo}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Assign to..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users?.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                >
                                                    {`${user.firstname} ${user.lastname}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Save changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
