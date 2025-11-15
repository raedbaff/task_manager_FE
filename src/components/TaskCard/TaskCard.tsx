import styles from "./TaskCard.module.css";
import type { Task } from "../../types/Task";
import { Check, Trash2, Edit, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { getCurrentEnvironment } from "../../config/environments";
import { useState } from "react";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEditTask: (task: Task) => void;
}

const TaskCard = ({ task, onToggle, onDelete, onEditTask }: Props) => {
  const [loading, setLoading] = useState(false);
  const deleteTask = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${getCurrentEnvironment().apiBaseUrl}/api/tasks/${task.id}`,
      );
      onDelete(response.data.id);
    } catch (error) {
      console.error("Error deleting task:", error);
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
  const updateTaskStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${getCurrentEnvironment().apiBaseUrl}/api/tasks`,
        { ...task, completed: !task.completed },
      );
      onToggle(response.data.id);
    } catch (error) {
      console.error("Error updating task:", error);
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

  return (
    <div
      className={`${styles.task} ${task.completed ? styles.taskCompleted : ""}`}
    >
      <div
        onClick={updateTaskStatus}
        className={`${styles.checkbox} ${
          task.completed ? styles.checkboxChecked : ""
        }`}
      >
        {task.completed && <Check size={16} color="white" />}
      </div>
      <div className={styles.taskContent}>
        <div className={styles.taskTitle}>{task.title}</div>
        <p className={styles.taskDescription}>{task.description}</p>
        <div className={styles.taskMeta}>
          <span className={`${styles.badge} ${styles.dateBadge}`}>
            {task.completed ? (
              <>
                <CheckCircle2 size={12} />
                Completed
              </>
            ) : (
              <>
                <Clock size={12} />
                Pending
              </>
            )}
          </span>
        </div>
      </div>
      <button
        disabled={loading}
        style={{ opacity: loading ? "0.5" : "1" }}
        onClick={() => onEditTask(task)}
        className={styles.editButton}
      >
        <Edit size={18} />
      </button>
      <button
        disabled={loading}
        style={{ opacity: loading ? "0.5" : "1" }}
        onClick={deleteTask}
        className={styles.deleteButton}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskCard;
