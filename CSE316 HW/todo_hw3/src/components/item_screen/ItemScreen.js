import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import * as firebase from 'firebase';

class ItemScreen extends Component{
    state = {
        description: this.props.currItem ? this.props.currItem.description : "",
        assigned_to:this.props.currItem ? this.props.currItem.assigned_to : "",
        due_date:this.props.currItem ? this.props.currItem.due_date : "",
        completed:this.props.currItem ? this.props.currItem.completed : false,
        key:this.props.itemKey
    }

    handleChange = (e) =>{
        const {target} = e;
        target.id === 'completed' ? this.setState(state=>({
            ...state,
            [target.id]: target.checked,
        })):
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    submitChanges = () =>{
        let firestore = getFirestore();
        let currentList = firestore.collection("todoLists").doc(this.props.id);
        let newList = this.props.todoList.items;
        if(this.props.currItem){
            newList[newList.indexOf(this.props.currItem)] = {
                description:this.state.description,
                assigned_to:this.state.assigned_to,
                due_date:this.state.due_date,
                completed:this.state.completed,
                key:this.state.key,
            }
        }else{
            newList.push({
                description:this.state.description,
                assigned_to:this.state.assigned_to,
                due_date:this.state.due_date,
                completed:this.state.completed,
                key:this.state.key,
            });
        }
        const list = currentList.set({
            items:newList,
            name:this.props.todoList.name,
            owner:this.props.todoList.owner,
            last_updated:new Date().getTime(),
        });
    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input value={this.state.description} id="description" type="text" className="validate" onChange={this.handleChange}/>
                                <label className="active" for="description">Description:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="assigned_to" value={this.state.assigned_to} type="text" className="validate" onChange={this.handleChange}/>
                                <label className="active" for="assigned_to">Assigned To:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="due_date" value={this.state.due_date} type="date" className="validate" onChange={this.handleChange}/>
                                <label className="active" for="due_date">Due Date:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label for="completed" className="active">Completed: </label>
                                <input className="filled-in" type="checkbox" id="completed" checked={this.state.completed} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col s12">
                            <Link className="btn pink lighten-1 z-depth-0" onClick={this.submitChanges} to={'/todoList/'+this.props.id}>Submit</Link>
                            <Link className="btn pink lighten-1 z-depth-0" to={'/todoList/'+this.props.id}>Cancel</Link>
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
    var currItem = items ? (key === items.length ? null :items[key] ): null;
    console.log(currItem);
    return{
        todoList:todoList,
        id:id,
        currItem:currItem,
        itemKey:key,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'todoLists'}
    ])
)(ItemScreen);