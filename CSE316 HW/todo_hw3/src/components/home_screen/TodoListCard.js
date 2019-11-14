import React from 'react';
import {getFirestore} from 'redux-firestore';

class TodoListCard extends React.Component {

    updateTimeStamp = () =>{
        let firestore = getFirestore();
        let currentList = firestore.collection("todoLists").doc(this.props.todoList.id);
        currentList.update({last_updated:new Date().getTime()});
    }

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link" onClick = {this.updateTimeStamp}>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;