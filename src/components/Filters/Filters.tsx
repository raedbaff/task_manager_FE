import styles from "./Filters.module.css";
interface Props {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  onNewTask: () => void;
}

const Filters = ({ currentFilter, onFilterChange, onNewTask }: Props) => {
  const filters = ["all", "active", "completed"];

  return (
    <div className={styles.filters}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`${styles.filterButton} ${filter === currentFilter ? styles.filterButtonActive : ""}`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
      <button onClick={onNewTask}>New Task</button>
    </div>
  );
};

export default Filters;
