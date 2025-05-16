import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import CalendarView from '../components/calendar/CalendarView';
import './Calendar.css';

const Calendar = () => {
  const { loading, fetchTasks, error } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="calendar-page page">
      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          <span className="btn-icon">+</span> Add Task
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading calendar...</div>
      ) : (
        <CalendarView />
      )}
    </div>
  );
};

export default Calendar;