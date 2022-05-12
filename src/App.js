import './App.css';
import AddTodo from './component/AddTodo';
import RemainingMessage from './component/RemianingMessage';
import SearchBar from './component/SearchBar';
import TodoList from './component/TodoList';
import TodoListContextProvider from './context/TodoListContext';


function App() {
  return (
    <div className="container">
      <div className='mt-5 mx-auto mw-xs'>
        <TodoListContextProvider>
          {/* Children ของ TodoListContextProvider */}
          <AddTodo />
          <SearchBar />
          <RemainingMessage />
          <TodoList />
        </TodoListContextProvider>
      </div>
    </div>
  );
}

export default App;
