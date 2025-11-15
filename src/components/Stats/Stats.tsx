import type { Task } from "../../types/Task";
import styles from "./Stats.module.css";
interface Props {
  tasks: Task[];
}
const Stats = ({ tasks }: Props) => {
  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.total}</div>
        <div className={styles.statLabel}>Total Tasks</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.active}</div>
        <div className={styles.statLabel}>Active</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.completed}</div>
        <div className={styles.statLabel}>Completed</div>
      </div>
    </div>
  );
};

export default Stats;
