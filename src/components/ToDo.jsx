import "./ToDo.css";

export default function ToDo({ items, onDelete, onToggleComplete }) {
  return (
    <ul className="todo-list">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`todo-item${item.completed ? " completed" : ""}`}
        >
          <span>{index + 1}.</span>
          <span style={{ flex: 1 }}>{item.task}</span>
          <span className="todo-date">
            {item.date_created
              ? new Date(item.date_created).toLocaleString()
              : ""}
          </span>
          <button onClick={() => onToggleComplete(item.id)}>
            {item.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
