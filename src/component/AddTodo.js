import React, { useContext, useState } from 'react';
import {TodoListContext} from '../context/TodoListContext'

export default function AddTodo() {
  const {addTodo} = useContext(TodoListContext);
  const [title, setTitle] = useState('');

  const handleSubmit =  (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input type='text' className={`form-control rounded-0`} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button className='btn btn-success rounded-0' >
                <i className='fas fa-plus'/>
            </button>
          </div>
      </form>
    </div>
  )
}
