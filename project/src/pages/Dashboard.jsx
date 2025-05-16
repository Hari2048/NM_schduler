import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import TaskItem from '../components/tasks/TaskItem';
import './Dashboard.css';

const Dashboard = () => {
  const { tasks, loading } = useTask();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (tasks) {
      let filtered = [...tasks];
      
      // Filter by status
      if (filter === 'completed') {
        filtered = filtered.filter(task => task.completed);
      } else if (filter === 'active') {
        filtered = filtered.filter(task => !task.completed);
      }
      
      // Filter by search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          task => 
            task.title.toLowerCase().includes(term) || 
            (task.description && task.description.toLowerCase().includes(term))
        );
      }
      
      // Sort by date and priority
      filtered.sort((a, b) => {
        // First by completion status
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        
        // Then by date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        }
        
        // Then by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      
      setFilteredTasks(filtered);
    }
  }, [tasks, filter, searchTerm]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading your tasks...</div>;
  }

  return (
    <div className="dashboard page">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Welcome, {user?.name}</h1>
          <p className="dashboard-subtitle">
            Here's what you need to focus on today
          </p>
        </div>
        
        <Link to="/tasks/new" className="btn btn-primary">
          <span className="btn-icon">+</span> Add Task
        </Link>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{tasks.filter(task => !task.completed).length}</div>
          <div className="stat-label">Tasks to do</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{tasks.filter(task => task.completed).length}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{tasks.filter(task => task.priority === 'high' && !task.completed).length}</div>
          <div className="stat-label">High Priority</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">
            {tasks.length > 0 
              ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) 
              : 0}%
          </div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>
      
      <div className="dashboard-controls">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="search-clear" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className="dashboard-tasks">
        {filteredTasks.length > 0 ? (
          <div className="grid-tasks">
            {filteredTasks.map(task => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className="no-tasks-container">
            <h3>{searchTerm ? 'No matching tasks found' : 'No tasks yet'}</h3>
            <p>
              {searchTerm 
                ? 'Try changing your search terms or filters' 
                : 'Start by adding a new task to your schedule'}
            </p>
            {!searchTerm && (
              <Link to="/tasks/new" className="btn btn-primary">
                Add Your First Task
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;