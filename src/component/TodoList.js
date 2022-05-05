import TodoItem from "./TodoItem";

function TodoList(props) {
    return(
        <div className="shadow">
            <ul className="list-group rounded-0">
                {/* {props.todoList.map(item => <TodoItem key={item.id} todoItem={item} deleteTodo={props.deleteTodo} toggleTodo={props.toggleTodo}/>)} */}
                {props.todoList.map(item => <TodoItem key={item.id} todoItem={item} deleteTodo={props.deleteTodo} updateTodo={props.updateTodo}/>)}
            </ul>
        </div>
    )
}

export default TodoList;