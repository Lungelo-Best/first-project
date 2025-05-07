import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

let count = 0;

const Todo = () => {
const [todos, setTodos] = useState([]); //Stores all todo items
const inputRef = useRef(null); //Reference to input field
const [priority, setPriority] = useState("Low"); //Stores selected priority   

useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedCount = parseInt(localStorage.getItem('todos_count')) || 0;
    setTodos(savedTodos);
    count = savedCount;
}, []);

useEffect(() => {
    if (todos.length > 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
    }
}, [todos]);

const add = () => {
    const task = inputRef.current.value.trim();
    if (task === "") return;
    
    const newTodo = {
    no: count++,
    text: task,
    display: "",
    priority: priority
    };
    
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    inputRef.current.value = "";
    
    localStorage.setItem("todos_count", count);
};

return (
    <div className='todo'>
    <div className='todo-header'>Todo List</div>
    <div className='todo-add'>
        <input
        ref={inputRef}
        type="text"
        placeholder='Add Your Task'
        className='todo-input'
        />
        {/* Priority dropdown - this is what allows users to select priority */}
        <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className='todo-priority-select'
        >
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