function EditTodo() {
    return(
        <form className="flex-grow-1">
            <div className="input-group">
                <input type='text' className="form-control rounded-0 "/>
                <button className="btn btn-primary rounded-0">
                    <i className="fa-regular fa-pen-to-square"/>
                </button>
                <button className="btn btn-danger rounded-0">
                    <i className="fa-solid fa-xmark"/>
                </button>
            </div>
        </form>
    )
}

export default EditTodo;