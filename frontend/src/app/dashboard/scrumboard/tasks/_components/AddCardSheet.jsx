"use client"

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../../../../components/ui/sheet";
import { Button } from "../../../../../components/ui/button";
import {toast} from "sonner";
import {taskService} from "../../../../../services/taskService";
import {useTasksStore} from "../../../../../store/useTasks";
import { TaskSchema} from "../../../../../schema/TaskSchema";
import { validateForm} from "../../../../../utils/FormValidation";

export default function AddCardSheet({ isOpen, onOpenChange }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("todo");
    const [priority, setPriority] = useState("medium");
    const { addTask } = useTasksStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            description,
            start_date: startDate,
            due_date: dueDate,
            status,
            priority
        };

        const { success, validData} = validateForm(formData, TaskSchema);

        if(success) {
            try {
                const response = await taskService.createTask(validData);
                addTask(response.data)
                onOpenChange(false);
                if(response.status === 201) {
                    toast.success("Task created successfully");
                    console.log("Task created successfully:", response.data);
                    setTitle("");
                    setDescription("");
                    setStartDate("");
                    setDueDate("");
                    setStatus("todo");
                    setPriority("medium");
                }
            } catch (error) {
                console.error("Error creating task:", error);
                toast.error("Error creating task");
            }
        }

    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto p-6">
                <SheetHeader>
                    <SheetTitle>Add New Card</SheetTitle>
                    <SheetDescription>
                        Create a new Task
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="description"
                            className="text-sm font-medium"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="start_date"
                            className="text-sm font-medium"
                        >
                            Start Date
                        </label>
                        <input
                            id="start_date"
                            name="start_date"
                            type="datetime-local"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="due_date"
                            className="text-sm font-medium"
                        >
                            Due Date
                        </label>
                        <input
                            id="due_date"
                            name="due_date"
                            type="datetime-local"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="status"
                            className="text-sm font-medium"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="unassigned">Unassigned</option>
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="in_review">In Review</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="priority"
                            className="text-sm font-medium"
                        >
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Create Task
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}