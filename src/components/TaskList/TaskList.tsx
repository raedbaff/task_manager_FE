import styles from "./TaskList.module.css";
import type { Task } from "../../types/Task";
import TaskCard from "../TaskCard/TaskCard";
import Loading from "../Loading/Loading";

interface Props {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEditTask: (task: Task) => void;
}

const TaskList = ({
  tasks,
  loading,
  onToggle,
  onDelete,
  onEditTask,
}: Props) => {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Loading />
      </div>
    );
  }

  if (!loading && tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <p className={styles.emptyText}>
          No tasks yet. Add one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
