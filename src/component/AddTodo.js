import React, { Component, useContext, useState } from 'react';
import {TodoListContext} from '../context/TodoListContext'

// export default function AddTodo() {
//   const {addTodo} = useContext(TodoListContext);
//   const [title, setTitle] = useState('');

//   const handleSubmit =  (e) => {
//     e.preventDefault();
//     addTodo(title);
//     setTitle('');
//   }

//   return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //       <div className='input-group'>
    //         <input type='text' className={`form-control rounded-0`} value={title} onChange={(e) => setTitle(e.target.value)}/>
    //         <button className='btn btn-success rounded-0' >
    //             <i className='fas fa-plus'/>
    //         </button>
    //       </div>
    //   </form>
    // </div>
//   )
// }

class AddTodo extends Component {
  state = {
    title: '',
    error: ''
  }

  handleAdd = (e) => {
    e.preventDefault();
    if(!this.state.title) {
      this.setState( {error : 'Title is required'} );
    }else {
      this.props.addTodo({ title: this.state.title, completed: false });
      this.setState({ title: '', error: '' })
    }
  }

  render() {
    return(
      <div>
      <form >
          <div className='input-group'>
            <input type='text' className={`form-control rounded-0 ${this.state.error ? 'is-invalid': null }`} value={this.state.title} onChange={e => this.setState({ title: e.target.value})}/>
            <button className='btn btn-success rounded-0' onClick={this.handleAdd}>
                <i className='fas fa-plus'/>
            </button>
            {this.state.error && <div className='invalid-feedback'>{this.state.error}</div>}
          </div>
      </form>
    </div>
    )
  }
}

export default AddTodo;