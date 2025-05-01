"use client"

import axios from '../lib/axios';
import Cookies from 'js-cookie';

export const taskService = {
    createTask: async (taskData) => {
        try {
             return await axios.post('/task', taskData, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('jwt')}`,
                }
            });
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    },

    getTasks: async () => {
        try {
            const response = await axios.get('/tasks', {
                headers : {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error;
        }
    },

    updateTask: async (taskId, taskData) => {
        try {
            return await axios.put(`/task/${taskId}`, taskData, {
                headers : {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    },

    deleteTask: async (taskId) => {
        try {
            return await axios.delete(`/task/${taskId}`, {
                headers : {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            });
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    }
}