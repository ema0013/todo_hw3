import React from 'react';
import {Link} from 'react-router-dom';
import {Button,Icon} from 'react-materialize';
import {getFirestore} from 'redux-firestore';

class ItemCard extends React.Component {

    itemUp = () =>{
        let newList = this.props.todoList.items;
        let index = newList.indexOf(this.props.item);
        if(index === 0){
            return;
        }
        let temp = newList[index];
        newList[index] = newList[index-1];
        newList[index-1] = temp;
        this.pushChangesToFirebase(newList);
    }
    itemDown = () =>{
        let newList = this.props.todoList.items;
        let index = newList.indexOf(this.props.item);
        if(index === newList.length-1){
            return;
        }
        let temp = newList[index];
        newList[index] = newList[index+1];
        newList[index+1] = temp;
        this.pushChangesToFirebase(newList);
    }
    itemDelete = () =>{
        let newList = this.props.todoList.items;
        let index = newList.indexOf(this.props.item);
        newList.splice(index,1);
        this.pushChangesToFirebase(newList);
    }

    pushChangesToFirebase = (newList) =>{
        let firestore = getFirestore();
        let currentList = firestore.collection('todoLists').doc(this.props.id);
        let list = currentList.update({
            items:newList
        });
    }

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
                    <div className="card-completed col s3">{"Status: "}{(item.completed) ? "Completed" : "Pending"}</div>
                    <div className="right-align col s2">
                        <Button fab={{direction:'left'}} className="red right-align" floating>
                            <Button floating icon={<Icon>arrow_upward</Icon> } className="red" onClick={this.itemUp}></Button>
                            <Button floating icon={<Icon>arrow_downward</Icon>} className="yellow" onClick={this.itemDown}></Button>
                            <Button floating icon={<Icon>delete</Icon>} className="blue" onClick={this.itemDelete}></Button>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;