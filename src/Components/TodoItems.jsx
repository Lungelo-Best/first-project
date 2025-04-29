import './CSS/TodoItems.css';
import tick from './Assets/tick.png';
import not_tick from './Assets/not_tick.png';
import cross from './Assets/cross.png';

const TodoItems = ({ no, display, text, setTodos, priority }) => {

const deleteTodo = () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.filter(todo => todo.no !== no);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
};

const toggle = () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.map(todo => {
    if (todo.no === no) {
        return {
        ...todo,
        display: todo.display === '' ? 'line-through' : ''
        };
    }
    return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
};

return (
    <div className={`todoitems ${priority?.toLowerCase() || 'low'}-priority`}>
    <div className={`todoitems-container ${display}`} onClick={toggle}>
        {display === '' ? <img src={not_tick} alt="not done" /> : <img src={tick} alt="done" />}
        <div className="todoitems-text">{text}</div>
    </div>

    <img
        className="todoitems-crossicon"
        onClick={deleteTodo}
        src={cross}
        alt="delete"
    />

    <div className="priority-label">{priority}</div>
    </div>
);
};

export default TodoItems;
