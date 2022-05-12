function StatusFilter() {

    return(
        <div className="btn-group ms-3">
            <input type='radio' className="btn-check" id="all" name="status" defaultChecked value='' />
            <label className="btn btn-outline-secondary rounded-0" htmlFor="all">
                <i className="fa-solid fa-list-check"/>
            </label>
            <input type='radio' className="btn-check" id="done" name="status" value=''  />
            <label className="btn btn-outline-secondary rounded-0" htmlFor="done">
                <i className="fa-solid fa-clipboard-check"></i>
            </label>
            <input type='radio' className="btn-check" id="doing" name="status" value='' />
            <label className="btn btn-outline-secondary rounded-0" htmlFor="doing">
                <i className="fa-solid fa-clipboard"></i>
            </label>
        </div>
    )
}

export default StatusFilter;