function StatusFilter(props) {
    const handleChange = e => {
        const value = e.target.value;
        // update status only
        // props.setSearchText(prev => ({ ...prev, status: (!value ? value : value === 'true' ) } ))

        props.setSearchStatus(!value ? value : value === 'true');
    }

    return(
        <div className="btn-group ms-3">
            {/* defaultChecked จะเหมือน property checked แต่ defaultChecked เหมาะกับ react มากกว่า คือให้ check id=all เป็นค่าเริ่มต้น ซึ่ง defaultChecked return ค่าเป็น true/false ซึ่งค่าเริ่มต้นมันเป็น true */}
            <input type='radio' className="btn-check" id="all" name="status" defaultChecked value='' onChange={handleChange}/>
            <label className="btn btn-outline-secondary rounded-0" htmlFor="all">
                <i className="fa-solid fa-list-check"/>
            </label>
            <input type='radio' className="btn-check" id="done" name="status" value='true' onChange={handleChange} />
            <label className="btn btn-outline-secondary rounded-0" htmlFor="done">
                <i className="fa-solid fa-clipboard-check"></i>
            </label>
            <input type='radio' className="btn-check" id="doing" name="status" value='false' onChange={handleChange}/>
            <label className="btn btn-outline-secondary rounded-0" htmlFor="doing">
                <i className="fa-solid fa-clipboard"></i>
            </label>
        </div>
    )
}

export default StatusFilter;