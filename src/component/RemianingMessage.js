// function RemainingMessage() {
//     return(
        // <div className="mt-4 py-3 text-center bg-dark text-white">
        //     <span>1 of 2 Task Remain</span>
        // </div>
//     )
// }

import { Component } from "react";

class RemainingMessage extends Component {
    render() {
        const remain = this.props.todos.filter(item => !item.completed);
        return(
            <div className="mt-4 py-3 text-center bg-dark text-white">
                <span>{remain.length} of {this.props.todos.length} Task Remain</span>
            </div>
        )
    }
}

export default RemainingMessage;