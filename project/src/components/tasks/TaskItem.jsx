import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { formatDate } from '../../utils/dateUtils';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTask();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTaskCompletion(task._id);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDeleting(true);
    await deleteTask(task._id);
  };

  const priorityClass = `priority-${task.priority}`;
  const categoryClass = `category-${task.category || 'default'}`;
  const completedClass = task.completed ? 'completed' : '';

  return (
    <div className={`task-item ${priorityClass} ${categoryClass} ${completedClass} ${isDeleting ? 'fade-out' : 'fade-in'}`}>
      <div className="task-header">
        <div className="task-priority-badge">{task.priority}</div>
        {task.category && <div className="task-category-badge">{task.category}</div>}
      </div>
      
      <h3 className="task-title">
        <Link to={`/tasks/${task._id}`}>{task.title}</Link>
      </h3>
      
      {task.description && (
        <p className="task-description">{task.description.length > 100 
          ? `${task.description.substring(0, 100)}...` 
          : task.description}
        </p>
      )}
      
      <div className="task-date">
        <div className="task-date-icon">📅</div>
        <span>{formatDate(task.date)}</span>
        {task.startTime && (
          <span className="task-time">
            {task.startTime} {task.endTime ? `- ${task.endTime}` : ''}
          </span>
        )}
      </div>
      
      <div className="task-actions">
        <button 
          className={`task-action-btn complete-btn ${task.completed ? 'completed' : ''}`} 
          onClick={handleToggleComplete}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? '✓' : '○'}
        </button>
        
        <div className="task-action-btn-group">
          <Link to={`/tasks/edit/${task._id}`} className="task-action-btn edit-btn" aria-label="Edit task">
            ✎
          </Link>
          <button className="task-action-btn delete-btn" onClick={handleDelete} aria-label="Delete task">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;