function TextFilter(props) {
    const handleText = (e) => {
        // update แค่ text แต่ status ค่าเดิม ใช้ callback เพราะไม่มีตัวเอดิมมาใช้ ต้องใช้อันที่เป็นปัจจุบัน
        props.setSearchText(prev => ({...prev, text: e.target.value }));
    }
    return(
        <div className="input-group">
            <input type='text' className="form-control rounded-0" value={props.text} onChange={handleText}/>
            <button  className="btn btn-secondary rounded-0" onClick={() => props.setSearchText(prev => ( {...prev, text: ''} ) )} >
                <i className="fa-solid fa-xmark"/>
            </button>
        </div> 
    )
}
export default TextFilter;