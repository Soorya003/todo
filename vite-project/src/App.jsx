import React, { useState } from "react";

// TodoItem Component
const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleUpdate = () => {
    onUpdate(editedTodo);
    setEditing(false);
  };
    
  return (
    <div className="todo-item">
      {editing ? (
        <div>
          
          <input
            type="text"
            value={editedTodo.name}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, name: e.target.value })
            }
          />
          <input
            type="text"
            value={editedTodo.description}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, description: e.target.value })
            }
          />
           <input
            type="text"
            value={editedTodo.status}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, status: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

// TodoList Component
const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

// TodoForm Component
const TodoForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description, status: "Not Completed" });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

// Main TodoApp Component
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filterTodos = () => {
    if (filter === "Completed") {
      return todos.filter((todo) => todo.status === "Completed");
    } else if (filter === "Not Completed") {
      return todos.filter((todo) => todo.status === "Not Completed");
    } else {
      return todos;
    }
  };

  return (
    <div className="todo-app">
      <h1>MYTODOS</h1>
      <TodoForm onAdd={addTodo} />
      <div>
        Filter:
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      <TodoList
        todos={filterTodos()}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
