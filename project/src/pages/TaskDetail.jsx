import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { formatDate } from '../utils/dateUtils';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, toggleTaskCompletion, deleteTask, loading } = useTask();
  const [task, setTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const fetchedTask = getTaskById(id);
    if (fetchedTask) {
      setTask(fetchedTask);
    } else {
      navigate('/dashboard');
    }
  }, [id, getTaskById, navigate]);
  
  if (loading || !task) {
    return <div className="loading">Loading task details...</div>;
  }
  
  const handleToggleComplete = async () => {
    const updatedTask = await toggleTaskCompletion(id);
    if (updatedTask) {
      setTask(updatedTask);
    }
  };
  
  const handleDelete = async () => {
    if (deleteConfirm) {
      const success = await deleteTask(id);
      if (success) {
        navigate('/dashboard');
      }
    } else {
      setDeleteConfirm(true);
    }
  };
  
  const cancelDelete = () => {
    setDeleteConfirm(false);
  };
  
  // Get category label
  const getCategoryLabel = (categoryValue) => {
    const categories = {
      'work': 'Work',
      'personal': 'Personal',
      'health': 'Health',
      'education': 'Education',
      'default': 'None'
    };
    
    return categories[categoryValue] || 'None';
  };
  
  // Get priority label and class
  const getPriorityInfo = (priorityValue) => {
    const priorities = {
      'high': { label: 'High', class: 'priority-high' },
      'medium': { label: 'Medium', class: 'priority-medium' },
      'low': { label: 'Low', class: 'priority-low' }
    };
    
    return priorities[priorityValue] || { label: 'Medium', class: 'priority-medium' };
  };
  
  const priorityInfo = getPriorityInfo(task.priority);
  const categoryClass = `category-${task.category || 'default'}`;
  
  return (
    <div className="task-detail-page page">
      <div className="page-header">
        <div className="back-link">
          <Link to="/dashboard">← Back to Dashboard</Link>
        </div>
        <div className="task-detail-actions">
          <Link to={`/tasks/edit/${id}`} className="btn btn-outline">
            Edit
          </Link>
          <button onClick={handleToggleComplete} className="btn btn-primary">
            Mark as {task.completed ? 'Incomplete' : 'Complete'}
          </button>
        </div>
      </div>
      
      <div className={`task-detail-card ${priorityInfo.class} ${categoryClass} ${task.completed ? 'completed' : ''}`}>
        <div className="task-detail-header">
          <div className="task-detail-meta">
            <span className={`task-priority ${priorityInfo.class}`}>
              {priorityInfo.label} Priority
            </span>
            {task.category && (
              <span className={`task-category ${categoryClass}`}>
                {getCategoryLabel(task.category)}
              </span>
            )}
            <span className="task-status">
              {task.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          
          <h1 className="task-detail-title">{task.title}</h1>
          
          <div className="task-detail-time">
            <div className="task-date-large">
              <span className="task-date-icon">📅</span>
              {formatDate(task.date)}
            </div>
            
            {(task.startTime || task.endTime) && (
              <div className="task-time-range">
                <span className="task-time-icon">⏰</span>
                {task.startTime && task.endTime 
                  ? `${task.startTime} - ${task.endTime}`
                  : task.startTime 
                    ? `Starts at ${task.startTime}` 
                    : `Ends at ${task.endTime}`
                }
              </div>
            )}
          </div>
        </div>
        
        {task.description && (
          <div className="task-detail-description">
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>
        )}
        
        <div className="task-detail-footer">
          <div className="task-created-at">
            Created: {formatDate(task.createdAt)}
          </div>
          
          {deleteConfirm ? (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this task?</p>
              <div className="delete-actions">
                <button onClick={cancelDelete} className="btn btn-outline">Cancel</button>
                <button onClick={handleDelete} className="btn btn-error">Delete</button>
              </div>
            </div>
          ) : (
            <button onClick={handleDelete} className="btn btn-outline btn-error">
              Delete Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;