import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TodoList from './TodoListPage';
import TodoItemPage from './TodoItemPage';
import CreateTodo from './CreateTodo';
import {loadTodoList} from '../actions/todo';

class TodoApp extends React.Component {
    componentDidMount() {
        this.props.loadTodoList();
    }

    render() {
        return (
            <Switch>
                <Route path="/create" component={CreateTodo}/>
                <Route path="/:id" component={TodoItemPage}/>
                <Route path="/" exact component={TodoList}/>
            </Switch>
        )
    }
}

TodoApp.propTypes = {
    loadTodoList: PropTypes.func.isRequired
};

export default connect(null, {loadTodoList})(TodoApp);