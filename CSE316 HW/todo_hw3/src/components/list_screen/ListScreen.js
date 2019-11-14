import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';

class ListScreen extends Component {
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
        last_updated:'',
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
                    <div className="col s4">Task</div>
                    <div className="col s3">Due Date</div>
                    <div className="col s3">Status</div>
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