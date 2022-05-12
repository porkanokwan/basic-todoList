import { useState, useEffect, createContext, useReducer } from "react";
import axios from 'axios';

// create กล่อง Context ไว้เก็บข้อมูล
const TodoListContext = createContext();

// ACTION
// ADD_TODO, TOGGLE_STATUS, DELETE_TODO, UPDATE_TODO, FETCH_TODO
const todoReducer = (state, action) => {
  // ตัวอย่าง action { type : 'ADD_TODO', ค่าที่จำเป็นในการกำหนด next State ต้องส่งเข้ามาในนี้ เช่น value : {title: 'Homework', id:'abc', complete: false} ส่งมาเพื่อให้เอาค่านี้ ใส่ใน state ตัวใหม่ได้ } มันจะเป็นตัวบอกว่าบนหน้า web เกิดอะไรขึ้น และกำหนดว่า เมื่อเกิด type นี้ ค่า state ถัดไปจะเป็นอะไร
  // if(action.type === 'ADD_TODO'){
  //   // return nextState
  // } else if (action.type === 'TOGGLE_STATUS') {
  //   // return nextState
  // } else if (action.type === 'DELETE_TODO') {
  //   // return nextState
  // } else if (action.type === 'UPDATE_TODO') {
  //   // return nextState
  // } else if (action.type === 'FETCH_TODO') {
  //   // return nextState
  // } else {
  //   // ถ้าเกิด dispatch มั่ว ต้อง return ค่าอะไรสักอย่างไป ไม่งั้นจะ error
  // }

  switch(action.type) {
    case 'ADD_TODO':  
      return [action.payload, ...state];
    case 'DELETE_TODO': {
      const newState = [...state];
      newState.splice(action.payload, 1);
      return newState;
    }
    case 'UPDATE_TODO': {
      // สร้าง function body หรือ {} มาครอบ scope ของ ตัวแปรให้ใช้ได้แค่ภายในนี้ และข้างนอกจะได้ใช้ชื่อนี้ซ้ำได้โดยที่เป็นคนละตัวกัน
      const newState = [...state];
      newState[action.payload.idx] = {...state[action.payload.idx], ...action.payload.response};
      return newState;
    }
    case 'FETCH_TODO': 
      return action.payload;
    default : 
      return state; // return เป็นค่า state ตัวเดิม
  }
}

function TodoListContextProvider(props) {
  // const [todoList, setTodoList] = useState([]);
  const [todoList, dispatch] = useReducer(todoReducer, []);
  // dispatch( { type: 'FETCH_TODO', value: [] } )

  // Effect function ต้องทำงานแบบ Synchronus เท่านั้น ทำแบบ async ไม่ได้
  useEffect( () => {
    const fetchTodo = async() => {
      const res = await axios.get('http://localhost:8080/todos');
      // console.log(res.data.todos)
      dispatch({ type: "FETCH_TODO", payload:  res.data.todos }) // res.data.todos ส่งออกมาเป็น [{...}, {...}, ...]
    }
    fetchTodo()
  }, []);

  const addTodo = async(title) => {
    const res = await axios.post('http://localhost:8080/todos', { title: title, completed: false })
    dispatch({ type: 'ADD_TODO', payload: res.data.todo })
  }

  const updateTodo = async(id, value) => {
    const idx = todoList.findIndex(item => item.id === id);
    const res = await axios.put(`http://localhost:8080/todos/${id}`, {...todoList[idx], ...value});
    dispatch({ type: 'UPDATE_TODO', payload: {response: res.data.todo, idx} })
    }

  const deleteTodo = async(id) => {
    const idx = todoList.findIndex(item => item.id === id);
    axios.delete(`http://localhost:8080/todos/${id}`);
    dispatch( { type: 'DELETE_TODO', payload: idx });
  }

  {
    /* ส่ง State todoList เข้าไปในกล่องTodoListContext เพื่อให้ Children ของ Provider และ Children ของ Children ของ Provider เรียกใช้ค่าที่ส่งผ่าน value ได้ 
    เช่น Component TodoList เรียกใช้ state todoList ได้ และลูกของ Component TodoList คือ Component TodoItem ก็สามารถเรียกใช้ state todoList ได้ด้วย */
  }
  return (
    //   TodoListContextProvider จะ run Provider นี้
    <TodoListContext.Provider
      // value={{ todoList: todoList, setTodoList: setTodoList, addTodo, updateTodo, deleteTodo }}  /* ถ้าจะส่ง value หลายตัวต้องส่งไปเป็น Obj */
      value={{ todoList: todoList, addTodo, updateTodo, deleteTodo }}  /* ถ้าจะส่ง value หลายตัวต้องส่งไปเป็น Obj */
    >
        {/* children เป็น special props ที่อยู่ระหว่าง tag เปิด/ปิด ของ Component นั้นๆ ดังนั้น อะไรก็ตามที่อยู่ระหว่าง tag เปิด/ปิด ของ TodoListContextProvider จะเป็น Children จะถูกเอามาใส่ในนี้ */}
        {props.children}
    </TodoListContext.Provider>
  );
}

export default TodoListContextProvider;
export { TodoListContext };
