import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import './App.css';
import AddTodo from './component/AddTodo';
import RemainingMessage from './component/RemianingMessage';
import SearchBar from './component/SearchBar';
import TodoList from './component/TodoList';

// ใส่ข้างนอกได้เพราะเป็นค่าคงที่
const initialToDoList = [
  { id: uuidv4(), title: 'Watching a movie', completed: false },
  { id: uuidv4(), title: 'Meeting a doctor', completed: false },
  { id: uuidv4(), title: 'Dinner with my family', completed: true}
];


function App() {
  const [todoList, setTodoList] = useState(initialToDoList);
  // ใช้วิธีต่างจาก branch main
  const [searchText, setSearchText] = useState({text: '', status: ''});
  // รับแค่ title เพราะ id มีตัวส้รางให้แล้ว completed เราต้องกำหนดให้เป็น false ตั้งแต่แรกอยู่แล้ว เหลือแค่สิ่งที่พิมพ์เข้ามาที่ต้องรับ
  const createTodo = (title) => {
    const nextTodo = [{id: uuidv4(), title: title, completed: false}, ...todoList];
    setTodoList(nextTodo)
  }

  // const deleteTodo = (id) => {
  //   const nextTodo = [...todoList];
  //   const selected = nextTodo.findIndex(item => item.id === id);
  //   nextTodo.splice(selected, 1);
  //   setTodoList(nextTodo);
  // }
  
  // อีกวิธี
  const deleteTodo = (id) => {
    // ถ้า findIndex หาไม่ id ไม่เจอจะ return เป็น -1
    const idx = todoList.findIndex(item => item.id === id);
    const nextTodo = [...todoList];
    if(idx !== -1) {
      nextTodo.splice(idx, 1);
    }
    setTodoList(nextTodo);
  }

  // const toggleTodo = (id) => {
  //   const nextTodo = [...todoList];
  //   let selected = todoList.find(item => item.id === id);
  //   selected.completed = !selected.completed;
  //   setTodoList(nextTodo);
  // }

  // รับ id มาเพื่อบอกตำแหน่ง และรับ value มาเพื่อ update ข้อมูล
  // const updateTodo = (id, value) => {
  //   let ele = todoList.find(item => item.id === id);
  //   const nextTodo = [...todoList];
  //   ele.completed = value.completed;
  //   setTodoList(nextTodo)
  // }
  const updateTodo = (id, { id: objId, ...value}) => {
    let idx = todoList.findIndex(item => item.id === id);
    const nextTodo = [...todoList];
    if(idx !== -1) {
      nextTodo[idx] = {...nextTodo[idx], ...value};
    }
    setTodoList(nextTodo)
  }

  const pendingTodoList = todoList.filter(item => !item.completed);

  // ใส่ toLowerCase() ให้เป็นเคส in-sensitive
  const filterTodoList = todoList.filter(item => item.title.toLowerCase().includes(searchText.text.toLowerCase()) && (searchText.status === '' || item.completed === searchText.status ) );

  

  return (
    <div className="container">
      <div className='mt-5 mx-auto mw-xs'>
        <AddTodo createTodo={createTodo}/>
        <SearchBar searchText={searchText} setSearchText={setSearchText}/>
        <RemainingMessage pending={pendingTodoList.length} total={todoList.length}/>
        {/* <TodoList todoList={todoList} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/> */}
        <TodoList todoList={filterTodoList} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      </div>
    </div>
  );
}

export default App;
