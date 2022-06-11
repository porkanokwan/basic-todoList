import { useState, useEffect, createContext } from "react";
import axios from "../config/axios";
import * as localStorageService from "../service/localStorage";

// create กล่อง Context ไว้เก็บข้อมูล
const TodoListContext = createContext();

function TodoListContextProvider(props) {
  const [todoList, setTodoList] = useState([]);

  // Effect function ต้องทำงานแบบ Synchronus เท่านั้น ทำแบบ async ไม่ได้
  useEffect(() => {
    const fetchTodo = async () => {
      // const res = await axios.get("/todos", {
      //   headers: { Authorization: "Bearer " + localStorageService.getToken() },
      // });

      // มี Intercepters แล้วไม่ต้องใส่ headers ไปเอง เพราะ ถ้าทำสำเร็จมันจะส่ง config headers ที่เขียนไว้ให้อัตโนมัติ
      const res = await axios.get("/todos");
      // console.log(res.data.todos)
      setTodoList(res.data.todos);
    };
    fetchTodo();
  }, []);

  const addTodo = async (title) => {
    // const res = await axios.post(
    //   "/todos",
    //   { title: title, completed: false },
    //   {
    //     headers: { Authorization: "Bearer " + localStorageService.getToken() },
    //   }
    const res = await axios.post("/todos", { title: title, completed: false });
    // const newTodo = [res.data.todo, ...todoList]
    // setTodoList(newTodo);
    setTodoList((prev) => [res.data.todo, ...prev]);
  };

  const updateTodo = async (id, value) => {
    console.log(id);
    // const res = await axios.put(`http://localhost:8080/todos/${id}`, value);
    const idx = todoList.findIndex((item) => item.id === id);
    if (idx !== -1) {
      // const res = await axios.put(
      //   `/todos/${id}`,
      //   {
      //     ...todoList[idx],
      //     ...value,
      //   },
      //   {
      //     headers: {
      //       Authorization: "Bearer " + localStorageService.getToken(),
      //     },
      //   }
      // );
      const res = await axios.put(`/todos/${id}`, {
        ...todoList[idx],
        ...value,
      });
      const newTodo = [...todoList];
      console.log(res.data);
      newTodo[idx] = { ...newTodo[idx], ...res.data.todo };
      setTodoList(newTodo);
    }
  };

  const deleteTodo = async (id) => {
    const idx = todoList.findIndex((item) => item.id === id);
    if (idx !== -1) {
      // axios.delete(`/todos/${id}`, {
      //   headers: { Authorization: "Bearer " + localStorageService.getToken() },
      // });
      axios.delete(`/todos/${id}`);
      const newTodo = todoList.filter((item) => item.id !== id);
      setTodoList(newTodo);
    }
  };

  {
    /* ส่ง State todoList เข้าไปในกล่องTodoListContext เพื่อให้ Children ของ Provider และ Children ของ Children ของ Provider เรียกใช้ค่าที่ส่งผ่าน value ได้ 
    เช่น Component TodoList เรียกใช้ state todoList ได้ และลูกของ Component TodoList คือ Component TodoItem ก็สามารถเรียกใช้ state todoList ได้ด้วย */
  }
  return (
    //   TodoListContextProvider จะ run Provider นี้
    <TodoListContext.Provider
      value={{
        todoList: todoList,
        setTodoList: setTodoList,
        addTodo,
        updateTodo,
        deleteTodo,
      }} /* ถ้าจะส่ง value หลายตัวต้องส่งไปเป็น Obj */
    >
      {/* children เป็น special props ที่อยู่ระหว่าง tag เปิด/ปิด ของ Component นั้นๆ ดังนั้น อะไรก็ตามที่อยู่ระหว่าง tag เปิด/ปิด ของ TodoListContextProvider จะเป็น Children จะถูกเอามาใส่ในนี้ */}
      {props.children}
    </TodoListContext.Provider>
  );
}

export default TodoListContextProvider;
export { TodoListContext };
