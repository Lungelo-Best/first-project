import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

let count = 0;

const Todo = () => {
const [todos, setTodos] = useState([]);
const inputRef = useRef(null);
  const priorityRef = useRef(null); // For selecting priority

const add = () => {
    const text = inputRef.current.value.trim();
    const priority = priorityRef.current.value;

    if (!text) return;

    const newTodo = {
    no: count++,
    text,
    display: '',
    priority,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    inputRef.current.value = '';
    localStorage.setItem('todos_count', count);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedCount = parseInt(localStorage.getItem('todos_count')) || 0;
    setTodos(savedTodos);
    count = savedCount;
}, []);

useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

return (
    <div className='todo'>
    <div className='todo-header'>Todo List</div>
    <div className='todo-add'>
        <input
        ref={inputRef}
        type='text'
        placeholder='Add Your Task'
        className='todo-input'
        />
        <select ref={priorityRef} className='todo-priority-select'>
        <option value='High'>High</option>
        <option value='Medium'>Medium</option>
        <option value='Low'>Low</option>
        </select>
        <div onClick={add} className='todo-add-btn'>
        ADD
        </div>
    </div>

    <div className='todo-list'>
        {todos.map((item, index) => (
        <TodoItems
            key={index}
            setTodos={setTodos}
            no={item.no}
            display={item.display}
            text={item.text}
            priority={item.priority}
        />
        ))}
    </div>
    </div>
);
};

export default Todo;
