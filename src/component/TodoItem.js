import { useContext, useState } from "react";
import { TodoListContext } from "../context/TodoListContext";
import EditTodo from "./EditTodo";

function TodoItem(props) {
    const [isEdit, setIsEdit] = useState(false);
    const {updateTodo, deleteTodo} = useContext(TodoListContext);
    const {item: {id, completed, title}} = props;

    return(
        <li className={`list-group-item d-flex justify-content-between align-items-center py-3 bd-callout bd-callout-${completed ? 'success' : 'warning'}`}>
            {isEdit ? <EditTodo item={props.item} updateTodo={updateTodo} setIsEdit={setIsEdit} /> :
            <>
                <span onClick={() => setIsEdit(prev => !prev)}>{title}</span>
                <div className="btn-group">
                    {/* <button className="btn btn-info rounded-0" onClick={() => updateTodo(id, {title: title, completed: !completed})}> */}
                    <button className="btn btn-info rounded-0" onClick={() => updateTodo(id, {completed: !completed})}>
                        <i className={`fa-solid fa-toggle-${completed ? 'on' : 'off'}`}></i>
                    </button>
                    <button className="btn btn-danger rounded-0" onClick={() => deleteTodo(id)}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div>
             </> 
            }
        </li>
    )
}

export default TodoItem;