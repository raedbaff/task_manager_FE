import styles from "./Filters.module.css"
interface Props {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

const Filters = ({ currentFilter, onFilterChange }: Props) => {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className={styles.filters}>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`${styles.filterButton} ${filter === currentFilter ? styles.filterButtonActive : ''}`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filters
