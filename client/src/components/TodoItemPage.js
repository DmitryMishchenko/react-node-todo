import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {loadTodo, updateTodo} from '../actions/todo';
import TodoForm from "./TodoForm";

class TodoItemPage extends React.Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.loadTodo(this.props.match.params.id).then(({success}) => {
            if (success) {
                this.setState({loading: false});
            } else {
                this.props.history.push('/');
            }
        });
    }

    onSubmit = (updatedTodo) => {
        this.props.updateTodo(this.props.todo._id, updatedTodo).then(({success}) => {
            if (success) {
                this.props.history.push('/');
            } else {
                // TODO display some errors...
            }
        });
    };

    render() {
        const {loading} = this.state;
        const {todo} = this.props;
        return (
            <div className="container">
                <br/>
                <h1>Edit Todo</h1>
                <br/>

                {!loading && <TodoForm
                    initialData={todo}
                    onSubmit={this.onSubmit}
                />}
            </div>
        )
    }
}

TodoItemPage.propTypes = {
    todo: PropTypes.shape({}).isRequired,
    loadTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

const mapStateToProps = (state) => ({
    todo: state.todo
});

export default connect(mapStateToProps, {loadTodo, updateTodo})(TodoItemPage);