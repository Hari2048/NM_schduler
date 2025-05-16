import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch tasks when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tasks');
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get task by ID
  const getTaskById = (id) => {
    return tasks.find(task => task._id === id);
  };

  // Add new task
  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const res = await api.post('/tasks', taskData);
      setTasks([...tasks, res.data]);
      setError(null);
      return res.data;
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      const res = await api.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      setError(null);
      return res.data;
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id) => {
    const task = tasks.find(task => task._id === id);
    if (task) {
      return await updateTask(id, { completed: !task.completed });
    }
    return null;
  };

  // Get tasks for a specific date
  const getTasksByDate = (date) => {
    const dateString = new Date(date).toISOString().split('T')[0];
    return tasks.filter(task => {
      const taskDate = new Date(task.date).toISOString().split('T')[0];
      return taskDate === dateString;
    });
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        getTaskById,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        getTasksByDate,
        clearError
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};