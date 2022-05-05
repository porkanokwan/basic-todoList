function RemainingMessage({pending, total}) {
    // const {pending, total} = props;
    return(
        <div className="mt-4 py-3 text-center bg-dark text-white">
            <span>{pending} of {total} Task Remain</span>
        </div>
    )
}

export default RemainingMessage;