import { useState } from "react";

export default function AddItem({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  function handleChange(e) {
    setNewTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask.trim()) {
      onAdd(newTask);
      setNewTask("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task"
        onChange={handleChange}
        value={newTask}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
