import { Component, useContext } from "react";
import { TodoListContext } from "../context/TodoListContext";
import TodoItem from "./TodoItem";

// function TodoList() {
//     // const value = useContext(TodoListContext);
//     // console.log(value); // value ใน TodoListContext ส่งมาเป็น {todoList: Array(0), setTodoList: ƒ} ซึ่งมาเป็น Obj จะสามารถ destructuring ได้
//     const {todoList, setTodoList} = useContext(TodoListContext);
//     return(
        // <div className="shadow">
        //     <ul className="list-group rounded-0">
        //         {todoList.map(item => <TodoItem key={item.id} item={item}/>)}
        //     </ul>
        // </div>
//     )
// }

class TodoList extends Component{
    render() {
        const {todos, deleteTodo, updateTodo} = this.props;
        return(
            <div className="shadow">
                <ul className="list-group rounded-0">
                    {todos.map(item => <TodoItem key={item.id} item={item} deleteTodo={deleteTodo} updateTodo={updateTodo}/>)}
                </ul>
            </div>
        )
    }
}

export default TodoList;