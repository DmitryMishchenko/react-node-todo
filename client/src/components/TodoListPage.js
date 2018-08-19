import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from "moment";

import InputSearch from './InputSearch';
import TodoList from './TodoList';
import {DEFAULT_DATE_FORMAT} from '../constants/dates';
import sweetAlert from '../helpers/sweetAlert';
import {removeTodo} from '../actions/todo';

moment.locale(moment.locale(), {
    week : {
        dow : 1, // Monday is the first day of the week.
    }
});

class TodoListPage extends React.Component {
    static generateRanges = () => {
        const minDate = moment().startOf('week');
        const maxDate = moment().startOf('week').day(7);
        const ranges = {
            [minDate.format(DEFAULT_DATE_FORMAT)]: []
        };

        while (minDate.isBefore(maxDate)) {
            ranges[minDate.add(1, 'day').format(DEFAULT_DATE_FORMAT)] = [];
        }

        return ranges;
    };

    state = {
        search: ''
    };


    onSearchChange = ({target: {value}}) => {
        this.setState({search: value});
    };

    removeTodo = (id) => {
        sweetAlert.confirm('Are you sure?').then(isConfirmed => {
            if (isConfirmed) {
                this.props.removeTodo(id).then(({success}) => {
                    if (success) {
                        sweetAlert.success('Success', 'Task was deleted');
                    } else {
                        sweetAlert.error('Error', 'Something went wrong');
                    }
                })
            }
        });
    };

    getFilteredTodos(list, search) {
        const includesSearch = str => str.toLowerCase().includes(search.toLowerCase());

        return list.filter(({title, description, sub_tasks}) => (
            includesSearch(title)
            || includesSearch(description)
            || sub_tasks.find((item) => includesSearch(item.title))
        ));
    }

    getTodosSplitByRanges = (list) => {
        const ranges = TodoListPage.generateRanges();

        list.forEach((item) => {
            const key = moment(item.date).format(DEFAULT_DATE_FORMAT);

            if (Array.isArray(ranges[key])) {
                ranges[key].push(item);
            }

        });

        return ranges;
    };


    render() {
        const {todoList} = this.props;
        const {search} = this.state;
        const filteredTodos = this.getFilteredTodos(Object.values(todoList), search);
        const todos = this.getTodosSplitByRanges(filteredTodos);
        return (
            <div className="container">
                <br/>

                <h1>Todo list</h1>

                <br/>

                <div className="d-flex justify-content-between">
                    <InputSearch
                        name="search"
                        value={search}
                        onChange={this.onSearchChange}
                    />
                    <Link className="btn btn-primary" to="/create">Create New</Link>
                </div>

                <br/>

                <TodoList
                    todos={todos}
                    removeTodo={this.removeTodo}
                />

            </div>
        )
    }
}

TodoListPage.propTypes = {
    todoList: PropTypes.shape({}).isRequired,
    removeTodo: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

const mapStateToProps = (state) => ({
    todoList: state.todoList
});

export default connect(mapStateToProps, {removeTodo})(TodoListPage);