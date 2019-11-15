import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

class ListScreen extends Component {
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
        last_updated:'',
        sortCriteria:'',
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState(() => ({
            last_updated: new Date().getTime()
        }));
        let firestore = getFirestore();
        let currentList = firestore.collection("todoLists").doc(this.props.todoList.id);
        currentList.update({[target.id]:target.value});
        currentList.update({last_updated:this.state.last_updated});
    }

    initModal = () =>{
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        instances[0].open();
    }

    deleteList = () =>{
        let firestore = getFirestore();
        let currentList = firestore.collection("todoLists").doc(this.props.todoList.id);
        currentList.delete();
    }

    compareTask = (item1,item2) =>{
        if(this.state.sortCriteria === ItemSortCriteria.SORT_BY_TASK_DECREASING){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        if(item1.description>item2.description){
            return 1;
        }
        else if (item1.description === item2.description){
            return 0;
        }else{
            return -1;
        }
    }

    compareDate = (item1,item2) =>{
        if(this.state.sortCriteria === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        if(item1.due_date>item2.due_date){
            return 1;
        }
        else if (item1.due_date === item2.due_date){
            return 0;
        }else{
            return -1;
        }
    }

    compareCompleted = (item1,item2) =>{
        if(this.state.sortCriteria === ItemSortCriteria.SORT_BY_STATUS_DECREASING){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        if(item1.completed>item2.completed){
            return 1;
        }
        else if (item1.completed === item2.completed){
            return 0;
        }else{
            return -1;
        }
    }

    sortTask = () =>{
        if(this.state.sortCriteria === ItemSortCriteria.SORT_BY_TASK_INCREASING){
            this.setState(()=>({
                sortCriteria:ItemSortCriteria.SORT_BY_TASK_DECREASING
            }));
        }else{
            this.setState(()=>({
                sortCriteria:ItemSortCriteria.SORT_BY_TASK_INCREASING
            })); 
        }
        let sortedList = this.props.todoList.items.sort(this.compareTask);
        const firestore = getFirestore();
        let currentList = firestore.collection('todoLists').doc(this.props.todoList.id);
        let newList = currentList.update({
            items:sortedList
        });
    }

    sortDate = () =>{
        if(this.state.sortCriteria === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING){
            this.setState(()=>({
                sortCriteria:ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
            }));
        }else{
            this.setState(()=>({
                sortCriteria:ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
            })); 
        }
        let sortedList = this.props.todoList.items.sort(this.compareDate);
        const firestore = getFirestore();
        let currentList = firestore.collection('todoLists').doc(this.props.todoList.id);
        let newList = currentList.update({
            items:sortedList
        });
    }

    sortCompleted = () =>{
        if(this.state.sortCriteria === ItemSortCriteria.SORT_BY_STATUS_INCREASING){
            this.setState(()=>({
                sortCriteria:ItemSortCriteria.SORT_BY_STATUS_DECREASING
            }));
        }else{
            this.setState(()=>({
                sortCriteria:ItemSortCriteria.SORT_BY_STATUS_INCREASING
            })); 
        }
        let sortedList = this.props.todoList.items.sort(this.compareCompleted);
        const firestore = getFirestore();
        let currentList = firestore.collection('todoLists').doc(this.props.todoList.id);
        let newList = currentList.update({
            items:sortedList
        });
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">
                    Todo List
                    <button data-target="modal1" className="btn modal-trigger right red darken-4 btn-large" onClick={this.initModal}>
                        <i className="large material-icons">delete_forever</i>
                    </button>                                 
                </h5>
                
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="password">Owner</label>
                    <input type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <div className="header yellow darken-2 row">
                    <div className="col s4 hoverable" onClick={this.sortTask}>Task</div>
                    <div className="col s3 hoverable" onClick={this.sortDate}>Due Date</div>
                    <div className="col s3 hoverable" onClick={this.sortCompleted}>Status</div>
                </div>
                <ItemsList todoList={todoList} />
                <div id="modal1" className="modal">
                    <div className="modal-content">
                    <h4>Delete Current List</h4>
                    <p>Are you sure you want to delete the current list?</p>
                    </div>
                    <div className="modal-footer">
                    <Link className="modal-close waves-effect waves-red btn-flat" to="/" onClick={this.deleteList}>Yes</Link>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">No</a>
                    </div>
                </div>
                <div className="center-align">
                    <Link className="btn-floating btn-large waves-effect waves-light pink lighten-4" to={"/itemScreen/"+todoList.id+"/"+(todoList.items.length)} params={{id:todoList.id, index:todoList.items.length}}>
                        <i className="material-icons">add_circle_outline</i>
                    </Link>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;
  
    return {
      todoList,
      auth: state.firebase.auth,
    };
  };

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);