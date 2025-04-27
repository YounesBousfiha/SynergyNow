"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../../../../components/ui/sheet"
import { Badge } from "../../../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar"
import { AlarmClock, Clock, Calendar, User, ListTodo, AlertCircle } from "lucide-react"
import { Separator } from "../../../../../components/ui/separator"
import {useEffect, useState} from "react";

export default function ViewTaskSheet({ task, open, onOpenChange }) {

    useEffect(() => {
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [open]);
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                <SheetHeader className="space-y-4">
                    <SheetTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ListTodo className="w-6 h-6 text-primary" />
                        {task.title}
                    </SheetTitle>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={`
                                px-3 py-1 text-xs font-semibold rounded-full
                                ${task.status === 'completed'
                                ? 'bg-green-100 text-green-700 border-green-300'
                                : task.status === 'in_progress'
                                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                                    : 'bg-gray-100 text-gray-700 border-gray-300'
                            }
                            `}
                        >
                            {task.status}
                        </Badge>
                        <Badge
                            className={`px-3 py-1 text-xs font-semibold rounded-full
                                ${task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                : task.priority === 'high'
                                    ? 'bg-red-100 text-red-700 border-red-300'
                                    : 'bg-green-100 text-green-700 border-green-300'
                            }
                            `}
                        >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {task.priority} priority
                        </Badge>
                    </div>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    <Separator className="my-4" />

                    {/* Description Section */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <ListTodo className="w-4 h-4 text-gray-500" />
                            Description
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {task.description || 'No description provided'}
                            </p>
                        </div>
                    </div>

                    {/* Dates Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                Due Date
                            </h4>
                            <div className="bg-red-50 p-3 rounded-lg flex items-center gap-2">
                                <AlarmClock className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-600 font-medium">
                                    {new Date(task.due_date).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                Created At
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {new Date(task.created_at).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Assignee Section */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            Assignee
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-gray-200">
                                <AvatarImage src="/placeholder.svg" alt="Assignee"/>
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {task.assigned_to?.firstname?.charAt(0) || 'A'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">
                                    {task.assigned_to?.firstname || 'Unassigned'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {task.assigned_to?.email || 'No email provided'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Additional Metadata */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">Additional Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Task ID:</span>
                                <p className="font-medium text-gray-700">{task.id}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Last Updated:</span>
                                <p className="font-medium text-gray-700">
                                    {new Date(task.updated_at).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}