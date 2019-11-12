import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link teal lighten-2">
                <div className="card-content row white-text text-darken-2">
                    <div className="card-title col s4">
                        {item.description}
                        <div className="card-assigned-to">{"Assigned to: "} {item.assigned_to}</div>
                    </div>
                    <div className="card-duedate col s3">{"Due Date: "}{item.due_date}</div>
                    <div className="card-completedcol s3">{"Status: "}{(item.completed) ? "Completed" : "Pending"}</div>
                </div>
            </div>
        );
    }
}
export default ItemCard;