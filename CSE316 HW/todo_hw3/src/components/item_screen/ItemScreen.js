import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends Component{
    state = {
        name:'',
        owner:'',
        due_date:'',
        completed:'',
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="Placeholder" id="name" type="text" className="validate"/>
                                <label className="active" for="name">Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="owner" type="text" className="validate"/>
                                <label className="active" for="owner">Owner</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="due_date" type="date" className="validate"/>
                                <label className="active" for="due_date">Due Date</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label for="completed" className="active">Completed: </label>
                                <input  className="filled-in" type="checkbox" id="completed" />
                            </div>
                        </div>
                        <div className="col s12">
                            <div className="btn pink lighten-1 z-depth-0">Submit</div>
                            <div className="btn pink lighten-1 z-depth-0">Cancel</div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) =>{
    const {params} = ownProps.match;
    const id = params.id;
    const todoLists = state.firestore.data.todoLists;
    const todoList = todoLists ? todoLists[id] : null;
    const items = todoList ? todoList.items : null;
    const key = params.key;
    var currItem = items ? (key === items.length ? {name:"",owner:"",due_date:"",completed:false} :items[key] ): null;
    console.log(currItem);
    return{
        todoList:todoList,
        id:id,
        key:key,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'todoLists'}
    ])
)(ItemScreen);