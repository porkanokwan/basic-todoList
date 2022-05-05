import { useState } from "react";

function EditTodo(props) {
    const {todoItem, setIsEdit, updateTodo, closeEditForm} = props;
    const [title, setTitle] = useState(todoItem.title);
    const [error, setError] = useState('');

    const handleEdit = e => {
        e.preventDefault();
        if(title.trim() === ''){
            return setError('Task title is required')
        }
        // setIsEdit(false);
        closeEditForm(); // เรียกใช้ function ที่ส่งเข้ามา
        updateTodo(todoItem.id, {title: title});
    }

    // const handleCancle = e => {
    //     e.preventDefault();
    //     setIsEdit(false);
    // }


    return(
        <form className="flex-grow-1">
            <div className="input-group">
                <input type='text' className={`form-control rounded-0 ${error ? 'is-invalid' : null}`} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <button className="btn btn-primary rounded-0" onClick={handleEdit}>
                    <i className="fa-regular fa-pen-to-square"/>
                </button>
                {/* ใส่ type เพราะ ปุ่มนี้อยู่ใน form ถ้าไม่กำหนดจะมีค่า defaut เป็น submit ซึ่งเราไม่ต้องการ */}
                {/* <button className="btn btn-dark rounded-0" type="button" onClick={handleCancle}> */}
                <button className="btn btn-dark rounded-0" type="button" onClick={closeEditForm}>
                    <i className="fa-solid fa-xmark"/>
                </button>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </form>
    )
}

export default EditTodo;