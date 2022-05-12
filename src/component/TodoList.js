import { useContext } from "react";
import { TodoListContext } from "../context/TodoListContext";
import TodoItem from "./TodoItem";

function TodoList() {
    // const value = useContext(TodoListContext);
    // console.log(value); // value ใน TodoListContext ส่งมาเป็น {todoList: Array(0), setTodoList: ƒ} ซึ่งมาเป็น Obj จะสามารถ destructuring ได้
    const {todoList, setTodoList} = useContext(TodoListContext);
    return(
        <div className="shadow">
            <ul className="list-group rounded-0">
                {todoList.map(item => <TodoItem key={item.id} item={item}/>)}
            </ul>
        </div>
    )
}

export default TodoList;