import { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import './App.css';
import AddTodo from './component/AddTodo';
import RemainingMessage from './component/RemianingMessage';
import SearchBar from './component/SearchBar';
import TodoList from './component/TodoList';

// Mock up data ใส่ข้างนอกได้เพราะเป็นค่าคงที่ 
// const initialToDoList = [
//   { id: uuidv4(), title: 'Watching a movie', completed: false },
//   { id: uuidv4(), title: 'Meeting a doctor', completed: false },
//   { id: uuidv4(), title: 'Dinner with my family', completed: true}
// ];

// ณ ตอนนี้ที่เราเพิ่ม/ลบ todoList หรือแก้ไขข้อมูลที่มีอยู่ไป มันจะไม่สามารถเก็บข้อมูลที่เพิ่ม/ลบ/แก้ไขข้อมูลที่เราทำได้ ต้องใช้ server API ซักตัวนึงมาช่วยเก็บข้อมูล
// โดยจะใช้ axios library ในการส่ง request ไปหา server api นั้น พอได้ response กลับมาแล้ว React มีหน้าที่เอาข้อมูลนั้นขั้นหน้า browser ซึ่งตอนนี้เราจะไม่ใช้ mock up data แล้วจะใช้ข้อมูลจากใน server แทน

function App() {
  // const [todoList, setTodoList] = useState(initialToDoList); // ใช้ mock up data
  const [todoList, setTodoList] = useState([]); // ค่าเริ่มต้นเป็น array เปล่าๆ เพราะ จะดึงข้อมูลจาก server โดยใช้ axios (เรียกอีกอย่างว่า fetch ข้อมูลจาก api)
  // const [searchText, setSearchText] = useState({text: '', status: ''});
  // หรือจะแยก state 2 อันก็ได้
  const [searchText, setSearchText] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // fetch ข้อมูลจาก server api มาใส่ใน state 
  useEffect( () => {
    axios.get('http://localhost:8080/todos')
    .then( response => {
      // ผลลัพธ์มันส่งมาเป็น obj ที่มี key ชื่อ todos มี value เป็น [{id:....}]
      console.log(response.data);
      // เอาข้อมูล value ที่ได้มา ใส่เข้าไปใน state todoList
      setTodoList(response.data.todos);    
    }); 
  }, [])

  // รับแค่ title เพราะ id มีตัวสร้างให้แล้ว completed เราต้องกำหนดให้เป็น false ตั้งแต่แรกอยู่แล้ว เหลือแค่สิ่งที่พิมพ์เข้ามาที่ต้องรับ
  // const createTodo = (title) => {
  //   const nextTodo = [{id: uuidv4(), title: title, completed: false}, ...todoList];
  //   setTodoList(nextTodo)
  // }

  // การ createTodo แบบด้านบนจะเพิ่มแค่ใน state พอ refresh หน้า Web มันจะหายไป เพราะ มันไม่เพิ่มข้อมูลใน server ดังนั้น ถ้าจะให้มันเก็บไว้ ต้องใช้ method POST ส่ง request ไปให้ server สร้าง TodoList ให้เรา
  // body ที่ต้องส่งไปต้องไปดูที่ server ว่าให้ส่งอะไรเข้าไปบ้างแล้วให้ส่งรูปแบบไหน ใน server นี้ให้ส่ง { title: "Task", completed: true } ไม่ต้องส่ง id เพราะ โดยปกติ backend จะต้องเป็นตัวที่สร้าง id ให้เรา
  const createTodo = title => {
    axios.post('http://localhost:8080/todos', { title: title, completed: false })
    .then( res => {
      console.log(res.data); // ส่ง todo obj อันใหม่ที่ create เข้ามา
      const nextTodo = [res.data.todo, ...todoList];
      setTodoList(nextTodo);
    })
  }


  // const deleteTodo = (id) => {
  //   const nextTodo = [...todoList];
  //   const selected = nextTodo.findIndex(item => item.id === id);
  //   nextTodo.splice(selected, 1);
  //   setTodoList(nextTodo);
  // }
  
  // อีกวิธี
  // const deleteTodo = (id) => {
  // ถ้า findIndex หาไม่ id ไม่เจอจะ return เป็น -1
    // const idx = todoList.findIndex(item => item.id === id);
    // const nextTodo = [...todoList];
    // if(idx !== -1) {
    //   nextTodo.splice(idx, 1);
    // }
    // setTodoList(nextTodo);
    // }

  // วิธีการ delete ข้อมูลใน server และ state ข้อมูลนั้นจะหายไป เพราะวิธีข้างบนลบแค่ใน state
  // const deleteTodo = id => {
  //   axios.delete(`http://localhost:8080/todos/${id}`)
  //   .then( res => {
  //     console.log(res.data);
  //     const nextTodo = [...todoList];
  //     setTodoList(nextTodo.filter(item => item.id != id));
  //   })
  // }
  const deleteTodo = async (id) => {
    const res = await axios.delete(`http://localhost:8080/todos/${id}`);
    console.log(res);
    const nextTodo = [...todoList];
    const idx = todoList.findIndex(item => item.id === id);
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
  // const updateTodo = (id, { id: objId, ...value}) => {
  // const updateTodo = (id, value) => {
    // let idx = todoList.findIndex(item => item.id === id);
    // const nextTodo = [...todoList];
    // if(idx !== -1) {
    //   nextTodo[idx] = {...nextTodo[idx], ...value};
    // }
    // setTodoList(nextTodo);
  // }

  // วิธีการ update ข้อมูลใน server และ state
  const updateTodo = async (id, value) => {
    // const idx = todoList.findIndex(item => item.id === id);
    // const res = await axios.put(`http://localhost:8080/todos/${id}`, { ...todoList[idx], ...value});
    // console.log(res.data);
    // const nextTodo = [...todoList];
    // if(idx !== -1) {
    //   nextTodo[idx] = {...nextTodo[idx], ...value};
    // }
    // setTodoList(nextTodo);
    const nextTodo = [...todoList];
    const idx = todoList.findIndex(item => item.id === id);
    if(idx !== -1) {
      nextTodo[idx] = {...nextTodo[idx], ...value};
      const res = await axios.put(`http://localhost:8080/todos/${id}`, nextTodo[idx]);
      console.log(res.data);
      setTodoList(nextTodo);
    }
  }


  const pendingTodoList = todoList.filter(item => !item.completed);

  // ใส่ toLowerCase() ให้เป็นเคส in-sensitive
  // const filterTodoList = todoList.filter(item => item.title.toLowerCase().includes(searchText.text.toLowerCase()) && (searchText.status === '' || item.completed === searchText.status ) );
  const filterTodoList = todoList.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()) && (searchStatus === '' || item.completed === searchStatus ) );

  

  return (
    <div className="container">
      <div className='mt-5 mx-auto mw-xs'>
        <AddTodo createTodo={createTodo}/>
        {/* <SearchBar searchText={searchText} setSearchText={setSearchText}/> */}
        <SearchBar searchText={searchText} setSearchText={setSearchText} searchStatus={searchStatus} setSearchStatus={setSearchStatus}/>
        <RemainingMessage pending={pendingTodoList.length} total={todoList.length}/>
        {/* <TodoList todoList={todoList} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/> */}
        <TodoList todoList={filterTodoList} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      </div>
    </div>
  );
}

export default App;
