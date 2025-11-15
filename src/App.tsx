import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import "./App.css"
import TaskEditor from './components/TaskEditor/TaskEditor';
import Stats from './components/Stats/Stats';
import Filters from './components/Filters/Filters';
import type { Task } from './types/Task';
import axios from 'axios';
import { getCurrentEnvironment } from './config/environments';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [Loading,setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [serverError,setServerError] = useState("");

  const addTask = (taskData: Task) => {
    setTasks([...tasks, { ...taskData, id: Date.now() }]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id:number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getCurrentEnvironment().apiBaseUrl}/api/tasks`)
        setTasks(response.data)

      } catch(error) {
        if (axios.isAxiosError(error)) {
          setServerError(error.message)
        }
        
      } finally {
        setLoading(false)
      }
      
    }
    fetchData();

  },[])

  return (
    <div className="app">
      <div className="container">
        <Header />
        <Stats tasks={tasks} />
        <div className="card">
          <TaskEditor onAddTask={addTask} />
          <Filters currentFilter={filter} onFilterChange={setFilter} />
          <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
