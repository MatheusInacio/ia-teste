import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (index: number) => void;
}

const TodoItem: React.FC<TodoProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>Remove</button>
    </li>
  );
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRemoveTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleCompleted}
            onRemove={handleRemoveTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
