import React from 'react';
import {Link} from 'react-router-dom';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props; 
        return (
            <div className="card z-depth-0 todo-list-link teal lighten-2">
                 <div className="card-content row white-text text-darken-2" > 
                    <div className="col s1">
                        <Link className="btn green" to={"/itemScreen/"+this.props.id+"/"+item.key} params={{id:this.props.id,index:item.key}}>
                            <i className="material-icons">edit</i>
                        </Link>
                    </div>
                    <div className="card-title col s3">
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