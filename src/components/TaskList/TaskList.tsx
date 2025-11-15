
import styles from "./TaskList.module.css"
import type { Task } from '../../types/Task';
import TaskCard from "../TaskCard/TaskCard";

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <p className={styles.emptyText}>No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
