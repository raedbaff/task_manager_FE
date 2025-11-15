import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import "./App.css";
import TaskEditor from "./components/TaskEditor/TaskEditor";
import Stats from "./components/Stats/Stats";
import Filters from "./components/Filters/Filters";
import type { Task } from "./types/Task";
import axios from "axios";
import { getCurrentEnvironment } from "./config/environments";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [Loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editorOpen, setEditorOpen] = useState(false);

  const addTask = (taskData: Task) => {
    setTasks([...tasks, { ...taskData }]);
  };
  const onEditTask = (task: Task) => {
    setTask(task);
    setEditorOpen(true);
  };
  const closeEditor = () => {
    setTask(undefined);
    setEditorOpen(false);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const updateTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching tasks");
      try {
        const response = await axios.get(
          `${getCurrentEnvironment().apiBaseUrl}/api/tasks`,
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (axios.isAxiosError(error)) {
          toast.dismiss();
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <ToastContainer />

      <div className="container">
        <Header />
        <Stats tasks={tasks} />
        <div className="card">
          {editorOpen && (
            <TaskEditor
              task={task}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onClose={closeEditor}
            />
          )}
          <Filters
            currentFilter={filter}
            onFilterChange={setFilter}
            onNewTask={() => setEditorOpen(true)}
          />

          <TaskList
            loading={Loading}
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEditTask={onEditTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
