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

export default function UpdateDialog({handleUpdate, id, task, open, onOpenChange }) {
    //const [isOpen, setIsOpen] = useState(false);

    const [assignee, setAssignee] = useState(task?.assigned_to || "");

    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState(task?.priority || "");
    const [status, setStatus] = useState(task?.status || "");
    const [due_date, setDueDate] = useState(task?.due_date || "");



    const handleUnassign = async () => {
        await handleUpdate(id, { ...task, assigned_to: null });
        setAssignee("");
        setAssignedUser(null);
    };

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
            status
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
                    </div>
                    <Button type="submit">Save changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
