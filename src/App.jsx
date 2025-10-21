import { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
  const [toDoItems, setToDoItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/server.php`)
      .then((response) => response.json())
      .then((data) => setToDoItems(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  function handleAddTask(newTaskText) {
    fetch(`http://localhost:8000/server.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTaskText }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetch(`http://localhost:8000/server.php`)
            .then((res) => res.json())
            .then((allTasks) => setToDoItems(allTasks));
        }
      })
      .catch((error) => console.error("Error adding task:", error));
  }

  function handleToggleComplete(taskId) {
    setToDoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      )
    );

    fetch(`http://localhost:8000/server.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    }).catch((error) => {
      console.error("Error updating task:", error);
      setToDoItems((prevItems) =>
        prevItems.map((item) =>
          item.id === taskId ? { ...item, completed: !item.completed } : item
        )
      );
    });
  }

  function handleDeleteTask(taskId) {
    fetch(`http://localhost:8000/server.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setToDoItems((prevItems) =>
            prevItems.filter((item) => item.id !== taskId)
          );
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddItem onAdd={handleAddTask} />
      <ToDo
        items={toDoItems}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;
