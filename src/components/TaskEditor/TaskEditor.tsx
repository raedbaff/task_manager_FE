import { useEffect, useRef, useState } from "react";
import styles from "./TaskEditor.module.css";
import type { Task } from "../../types/Task";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getCurrentEnvironment } from "../../config/environments";
import { toast } from "react-toastify";
interface Props {
  task?: Task;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
}
const TaskEditor = ({ task, onAddTask, onClose, onUpdateTask }: Props) => {
  console.log(task);
  const [loading, setLoading] = useState(false);
  const el = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    mode: "onSubmit",
    defaultValues: task,
  });

  const createTask = async (task: Task) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${getCurrentEnvironment().apiBaseUrl}/api/tasks`,
        task,
      );
      onAddTask(response.data);
      reset();
    } catch (error) {
      console.error("Error creating task:", error);
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
  const editTask = async (task: Task) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${getCurrentEnvironment().apiBaseUrl}/api/tasks`,
        task,
      );
      onUpdateTask(response.data);
      reset();
    } catch (error) {
      console.error("Error creating task:", error);
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
  const submitForm: SubmitHandler<Task> = (data) => {
    if (task) {
      editTask(data);
    } else {
      createTask(data);
    }
    onClose();
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (el.current && !el.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={el} className={styles.container}>
      <form onSubmit={handleSubmit(submitForm)} className={styles.inputGroup}>
        <h3>{task ? "Edit" : "Add"} Task</h3>
        <input
          type="text"
          {...register("title", {
            required: true,
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters long",
            },
          })}
          placeholder="What needs to be done?"
          className={styles.input}
        />

        <span
          style={{ opacity: errors.title ? "1" : "0" }}
          className={styles.error}
        >
          {errors?.title?.message}
        </span>
        <textarea
          rows={10}
          {...register("description", {
            required: false,
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters long",
            },
            maxLength: {
              value: 1000,
              message: "Description must be at most 1000 characters long",
            },
          })}
          placeholder="Description"
          className={styles.textarea}
        />

        <span
          style={{ opacity: errors.description ? "1" : "0" }}
          className={styles.error}
        >
          {errors?.description?.message}
        </span>
        <div className={styles.buttons}>
          <button
            onClick={onClose}
            type="button"
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            style={{ opacity: loading ? "0.5" : "1" }}
            type="submit"
            className={styles.addButton}
          >
            {task ? "Edit" : "Add"} Task
          </button>
        </div>
      </form>
    </div>
  );
};
export default TaskEditor;
