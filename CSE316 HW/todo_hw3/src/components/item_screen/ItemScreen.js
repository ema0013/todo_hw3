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
        completed:false,
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state);
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'todoLists'}
    ])
)(ItemScreen);