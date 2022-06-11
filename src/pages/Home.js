import AddTodo from "../component/AddTodo";
import RemainingMessage from "../component/RemianingMessage";
import SearchBar from "../component/SearchBar";
import TodoList from "../component/TodoList";
import TodoListContextProvider from "../context/TodoListContext";

function Home() {
  return (
    <TodoListContextProvider>
      {/* Children ของ TodoListContextProvider */}
      <AddTodo />
      <SearchBar />
      <RemainingMessage />
      <TodoList />
    </TodoListContextProvider>
  );
}

export default Home;
