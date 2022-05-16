import axios from "axios";
import { Component } from "react";
import "./App.css";
import AddTodo from "./component/AddTodo";
import RemainingMessage from "./component/RemianingMessage";
import SearchBar from "./component/SearchBar";
import TodoList from "./component/TodoList";
import TodoListContextProvider from "./context/TodoListContext";


class App extends Component {
  state = { todos: [] };

  componentDidMount() {
    axios.get('http://localhost:8080/todos')
    .then(res => this.setState({ todos: res.data.todos}))
  }

  addTodo = (newTodo) => {
    axios.post('http://localhost:8080/todos', newTodo)
    .then(res => this.setState({ todos: [res.data.todo, ...this.state.todos] }))
  }

  deleteTodo = id => {
    axios.delete('http://localhost:8080/todos/' + id)
    .then(() => {
      const idx = this.state.todos.findIndex(item => item.id === id);
      const newTodos = [...this.state.todos]
      newTodos.splice(idx, 1);
      this.setState({ todos: newTodos })
    })
  }

  updateTodo = async(id, value) => {
    const idx = this.state.todos.findIndex(item => item.id === id);
    await axios.put('http://localhost:8080/todos/' + id, {...this.state.todos[idx], ...value})
    const newTodos = [...this.state.todos];
    newTodos[idx] = { ...newTodos[idx], ...value };
    this.setState({ todos: newTodos });
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <div className="mt-5 mx-auto mw-xs">
          {/* <TodoListContextProvider> */}
            {/* Children ของ TodoListContextProvider */}
            <AddTodo addTodo={this.addTodo} todos={this.state.todos}/>
            <SearchBar />
            <RemainingMessage todos={this.state.todos}/>
            <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
          {/* </TodoListContextProvider>  */}
        </div>
      </div>
    );
  }
}

export default App;
// function App() {
//   return (
// <div className="container">
//   <div className='mt-5 mx-auto mw-xs'>
//     <TodoListContextProvider>
//       {/* Children ของ TodoListContextProvider */}
//       <AddTodo />
//       <SearchBar />
//       <RemainingMessage />
//       <TodoList />
//     </TodoListContextProvider>
//   </div>
// </div>
//   );
// }

// export default App;
