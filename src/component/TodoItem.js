import EditTodo from "./EditTodo";

function TodoItem(props) {
    const color = props.todoItem.completed ? 'bd-callout-success' : 'bd-callout-warning' ;
    const toggle = props.todoItem.completed ? 'on' : 'off' ;

    const handleDel = (e) => {
        e.preventDefault();
        props.deleteTodo(props.todoItem.id);
    }

    // const handleClickToggle = () => {
    //     props.toggleTodo(props.todoItem.id);
    // }
    const handleClickToggle = () => {
        props.updateTodo(props.todoItem.id, {completed: !props.todoItem.completed});
    }

    return(
        <li className={`list-group-item d-flex justify-content-between align-items-center py-3 bd-callout ${color}`}>
            <span>{props.todoItem.title}</span>
            <div className="btn-group">
                <button className="btn btn-info rounded-0" onClick={handleClickToggle}>
                    <i className={`fa-solid fa-toggle-${toggle}`}></i>
                </button>
                <button className="btn btn-danger rounded-0" onClick={handleDel}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
            {/* <EditTodo/> */}
        </li>
    )
}

export default TodoItem;