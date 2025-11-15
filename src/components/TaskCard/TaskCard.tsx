import styles from "./TaskCard.module.css"
import type { Task } from '../../types/Task';
import { Check, Trash2, Calendar } from 'lucide-react';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onToggle, onDelete }: Props) => {
  


  return (
    <div className={`${styles.task} ${task.completed ? styles.taskCompleted : ''}`}>
      <div
        onClick={() => onToggle(task.id as number)}
        className={`${styles.checkbox} ${task.completed ? styles.checkboxChecked : ''}`}
      >
        {task.completed && <Check size={16} color="white" />}
      </div>
      <div className={styles.taskContent}>
        <div className={styles.taskTitle}>{task.title}</div>
        <div className={styles.taskMeta}>
         
          <span className={`${styles.badge} ${styles.dateBadge}`}>
            <Calendar size={12} />
            today
            {/* {task.createdAt.toLocaleDateString()} */}
          </span>
        </div>
      </div>
      <button onClick={() => onDelete(task.id as number)} className={styles.deleteButton}>
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskCard;
