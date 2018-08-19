import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TodoForm from './TodoForm';
import {createTodo} from '../actions/todo';

const CreateTodo = ({history, createTodo}) => {
    const onSubmit = (todo) => {
        createTodo(todo).then(({success}) => {
            if (success) {
                history.push('/');
            } else {
                // TODO display some errors...
            }
        })
    };

    return (
        <div className="container">
            <br/>
            <h1>Create New Todo</h1>
            <br/>

            <TodoForm onSubmit={onSubmit} />
        </div>
    )
};

CreateTodo.propTypes = {
    createTodo: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

export default connect(null, {createTodo})(CreateTodo);