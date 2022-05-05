import React, { useState } from 'react'

export default function AddTodo(props) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title.trim() === '') {
      return setError('Task title is required');
    }
    props.createTodo(title);
    setError('')
    setTitle('')
  }

  return (
    <div>
      {/* ควรใส่ใน form มากกว่าใน button */}
      <form onSubmit={handleSubmit}>
          <div className='input-group'>
            {/* <input type='text' className={`form-control rounded-0 ${err}`} value={title} onChange={(e) => setTItle(e.target.value)}/> */}
            <input type='text' className={`form-control rounded-0 ${error && 'is-invalid'}`} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button className='btn btn-success rounded-0'>
                <i className='fas fa-plus'/>
            </button>
            {error && <div className='invalid-feedback'>{error}</div> }
          </div>
      </form>
    </div>
  )
}
