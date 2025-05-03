"use client"
import KanbanColumn from "./_components/KanbanColumn";
import TaskCard from "./_components/TaskCard";
import {useEffect, useState} from "react";
import { useTasksStore } from "../../../../store/useTasks";
import {toast} from "sonner";
import {taskService} from "../../../../services/taskService";

export default function Tasks() {

    const { tasks, setTasks } = useTasksStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await taskService.getTasks()
                setTasks(response)
                setIsLoading(false)
            } catch (error) {
                toast.error("Error while loading the tasks")
            }
        }

        fetchTasks();
    }, []);

    useEffect(() => {
        console.log("Tasks updated:", tasks);
    }, [tasks])

    const unassignedTasks = tasks.filter(task => task.status === "unassigned");
    const todoTasks = tasks.filter(task => task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.status === "in_progress");
    const inReviewTasks = tasks.filter(task => task.status === "in_review");
    const doneTasks = tasks.filter(task => task.status === "done");

    const unassignedCount = unassignedTasks.length;
    const todoCount = todoTasks.length;
    const inProgressCount = inProgressTasks.length;
    const inReviewCount = inReviewTasks.length;
    const doneCount = doneTasks.length;


    if(isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#296c5c]"></div>
            </div>
        )
    }
    return (
        <>
            <main className="p-6 overflow-x-auto">
                <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
                <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 min-w-max">
                    {/* Unassigned Column */}
                    <KanbanColumn title="Unassigned" count={unassignedCount}>
                        {unassignedTasks.map((task) => {
                            return (
                                <TaskCard key={task.id} id={task.id} task={task}/>
                            )
                        })}
                    </KanbanColumn>

                    {/* TODO Column */}
                    <KanbanColumn title="TODO" count={todoCount}>
                        {todoTasks.map((task) => {
                            return (
                                <TaskCard key={task.id} id={task.id} task={task}/>
                            )
                        })}
                    </KanbanColumn>

                    {/* InProgress Column */}
                    <KanbanColumn title="InProgress" count={inProgressCount}>
                        {inProgressTasks.map((task) => {
                            return (
                                <TaskCard key={task.id} id={task.id} task={task}/>
                            )
                        })}
                    </KanbanColumn>

                    {/* InReview Column */}
                    <KanbanColumn title="InReview" count={inReviewCount}>
                        {inReviewTasks.map((task) => {
                            return (
                                <TaskCard key={task.id} id={task.id} task={task}/>
                            )
                        })}
                    </KanbanColumn>

                    {/* Done Column */}
                    <KanbanColumn title="Done" count={doneCount}>
                        {doneTasks.map((task) => {
                            return (
                                <TaskCard key={task.id} id={task.id} task={task}/>
                            )
                        })}
                    </KanbanColumn>
                </div>
                </div>
            </main>
        </>
    );
}