import  { useState } from "react";
import styles from "./TaskEditor.module.css";
import type { Task } from "../../types/Task";
interface Props {
  onAddTask: (task: Task) => void;
}
const TaskEditor = ({ onAddTask }: Props) => {
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = () => {
    if (inputValue) {
      onAddTask({
        title: inputValue.title,
        description: inputValue.description,
      });
      setInputValue({
        title: "",
        description: "",
      });
    }
  };
  const updateInput = (key: "title" | "description", value: string) => {
    setInputValue(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={styles.inputGroup}>
      <input
        style={{flex:"0.5"}}
        type="text"
        value={inputValue.title}
        onChange={(e) => updateInput("title",e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="What needs to be done?"
        className={styles.input}
      />
      <input
        style={{flex:"1"}}
        type="text"
        value={inputValue.description}
        onChange={(e) => updateInput("description",e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Description"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.addButton}>
        
        Add Task
      </button>
    </div>
  );
};
export default TaskEditor;
