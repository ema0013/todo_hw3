import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <div className="card-title">{item.description}</div>
                    <div className="card-assigned-to">{"Assigned to: "} {item.assigned_to}</div>
                    <div className="card-duedate">{"Due Date: "}{item.due_date}</div>
        <div className="card-completed">{"Status: "}{(item.completed) ? "Completed" : "Pending"}</div>
                </div>
            </div>
        );
    }
}
export default ItemCard;