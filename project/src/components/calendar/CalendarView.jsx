import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { useTask } from '../../context/TaskContext';
import TaskItem from '../tasks/TaskItem';
import './CalendarView.css';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const { tasks, loading } = useTask();

  useEffect(() => {
    if (selectedDate && tasks.length > 0) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const filteredTasks = tasks.filter(task => {
        const taskDate = format(new Date(task.date), 'yyyy-MM-dd');
        return taskDate === dateString;
      });
      setTasksForSelectedDate(filteredTasks);
    } else {
      setTasksForSelectedDate([]);
    }
  }, [selectedDate, tasks]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to add class to dates with tasks
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = format(date, 'yyyy-MM-dd');
      const hasTask = tasks.some(task => {
        const taskDate = format(new Date(task.date), 'yyyy-MM-dd');
        return taskDate === dateString;
      });
      return hasTask ? 'has-tasks' : null;
    }
  };

  // Function to add content to dates with tasks
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = format(date, 'yyyy-MM-dd');
      const dayTasks = tasks.filter(task => {
        const taskDate = format(new Date(task.date), 'yyyy-MM-dd');
        return taskDate === dateString;
      });
      
      if (dayTasks.length > 0) {
        return (
          <div className="task-dot-container">
            {dayTasks.length <= 3 ? (
              dayTasks.map((task, index) => (
                <span 
                  key={index} 
                  className={`task-dot priority-${task.priority}`}
                ></span>
              ))
            ) : (
              <>
                <span className="task-dot"></span>
                <span className="task-dot"></span>
                <span className="task-count">+{dayTasks.length}</span>
              </>
            )}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-container">
        <div className="calendar-wrapper">
          <Calendar 
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            tileContent={tileContent}
            nextLabel="›"
            prevLabel="‹"
            next2Label="»"
            prev2Label="«"
            className="react-calendar"
          />
        </div>
      </div>
      
      <div className="calendar-tasks">
        <h2 className="selected-date-title">
          Tasks for {format(selectedDate, 'MMMM d, yyyy')}
        </h2>
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <div className="calendar-tasks-list">
            {tasksForSelectedDate.length > 0 ? (
              tasksForSelectedDate.map(task => (
                <TaskItem key={task._id} task={task} />
              ))
            ) : (
              <div className="no-tasks">
                <p>No tasks scheduled for this day.</p>
                <a href="/tasks/new" className="btn btn-accent">Add Task</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;