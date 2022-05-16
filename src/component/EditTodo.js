import { Component, useState } from "react";

// function EditTodo(props) {
//     const {item: {id, title}, updateTodo, setIsEdit} = props;
//     const [text, setText] = useState(title);

//     const handleEditText = (e, value) => {
//         // console.log(value)
//         e.preventDefault();
//         updateTodo(id, { title: value });
//         setIsEdit(false);
//     }
    
//     return(
//         <form className="flex-grow-1">
//             <div className="input-group">
//                 <input type='text' className={`form-control rounded-0 'is-invalid' `} value={text} onChange={(e) => setText(e.target.value)} />
//                 <button className="btn btn-primary rounded-0" onClick={(e) => handleEditText(e, text)}>
//                     <i className="fa-regular fa-pen-to-square"/>
//                 </button>
//                 <button className="btn btn-dark rounded-0" type="button" onClick={() => setIsEdit(false)} >
//                     <i className="fa-solid fa-xmark"/>
//                 </button>
//             </div>
//         </form>
//     )
// }

class EditTodo extends Component {
    state = {
        title: this.props.todo.title,
        error: ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.title) {
            this.setState({ error: 'Title input is required' });
        } else {
            this.props.updateTodo(this.props.todo.id, { ...this.props.todo, title: this.state.title});
            this.setState({ error: '' });
            this.props.closeEdit();
        }
    }

    render() {
        return(
            <form className="flex-grow-1" onSubmit={this.handleSubmit}>
             <div className="input-group">
                 <input type='text' className={`form-control rounded-0 ${this.state.error && 'is-invalid'}`} value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                 <button className="btn btn-primary rounded-0">
                     <i className="fa-regular fa-pen-to-square"/>
                 </button>
                 <button className="btn btn-dark rounded-0" type="button" onClick={() => this.props.closeEdit()} >
                     <i className="fa-solid fa-xmark"/>
                 </button>
                {this.state.error && <div className="invalid-feedback">{this.state.error}</div>}
             </div>
         </form>
        )
    }
}

export default EditTodo;