"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { userService } from "../../../../../services/UserService"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../../../components/ui/dialog"
import { Button } from "../../../../../components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../../components/ui/select"

export default function UpdateDialog({ handleUpdate, id, deal, open, onOpenChange }) {
    const [users, setUsers] = useState([])
    const [assignedUser, setAssignedUser] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
        assignedTo: "",
        status: ""
    })

    useEffect(() => {
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [open]);

    // Initialize form data when dialog opens
    useEffect(() => {
        if (open && deal) {
            setFormData({
                title: deal.title || "",
                description: deal.description || "",
                amount: deal.amount?.toString() || "",
                assignedTo: deal.assigned_to?.toString() || "",
                status: deal.status || ""
            })

            // Set assigned user if exists
            if (deal.agent_id) {
                const assigned = users.find(user => user.id === deal.agent_id)
                setAssignedUser(assigned)
            }
        }
    }, [open])

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers()
                if (response.status === 200) {
                    setUsers(response.data.message)
                }
            } catch (error) {
                console.error("Error fetching users: ", error)
                toast.error("Error fetching users")
            }
        }

        fetchUsers()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updateData = {
            title: formData.title,
            description: formData.description,
            amount: parseFloat(formData.amount),
            status: formData.status,
            agent_id: formData.assignedTo ? parseInt(formData.assignedTo) : null
        }

        await handleUpdate(id, updateData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Details</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                            placeholder="Enter description"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium">
                            Status
                        </label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData(prev => ({ ...prev, status: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="followups">Follow Up</SelectItem>
                                <SelectItem value="under_review">Under Review</SelectItem>
                                <SelectItem value="closed_won">Won</SelectItem>
                                <SelectItem value="closed_not_won">Lost</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Assign to Agent
                        </label>
                        {assignedUser ? (
                            <div className="flex items-center gap-2">
                                <div className="flex-1 p-2 border rounded-md">
                                    {`${assignedUser.firstname} ${assignedUser.lastname}`}
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => {
                                        setAssignedUser(null)
                                        setFormData(prev => ({ ...prev, assignedTo: "" }))
                                    }}
                                >
                                    Unassign
                                </Button>
                            </div>
                        ) : (
                            <Select
                                value={formData.assignedTo}
                                onValueChange={(value) => {
                                    const selected = users.find(user => user.id.toString() === value)
                                    setAssignedUser(selected)
                                    setFormData(prev => ({ ...prev, assignedTo: value }))
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an agent" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            {`${user.firstname} ${user.lastname}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Update Deal
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}