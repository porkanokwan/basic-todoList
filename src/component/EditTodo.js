import { useState } from "react";

function EditTodo(props) {
    const {item: {id, title}, updateTodo, setIsEdit} = props;
    const [text, setText] = useState(title);

    const handleEditText = (e, value) => {
        // console.log(value)
        e.preventDefault();
        updateTodo(id, { title: value });
        setIsEdit(false);
    }
    
    return(
        <form className="flex-grow-1">
            <div className="input-group">
                <input type='text' className={`form-control rounded-0 'is-invalid' `} value={text} onChange={(e) => setText(e.target.value)} />
                <button className="btn btn-primary rounded-0" onClick={(e) => handleEditText(e, text)}>
                    <i className="fa-regular fa-pen-to-square"/>
                </button>
                <button className="btn btn-dark rounded-0" type="button" onClick={() => setIsEdit(false)} >
                    <i className="fa-solid fa-xmark"/>
                </button>
            </div>
        </form>
    )
}

export default EditTodo;