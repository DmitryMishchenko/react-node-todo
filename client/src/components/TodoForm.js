import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import uniquid from "uniquid";
import moment from 'moment';

import Datepicker from './Datepicker';
import SubtaskList from './SubtaskList';
import {DEFAULT_DATE_FORMAT} from '../constants/dates';

moment.locale(moment.locale(), {
    week : {
        dow : 1, // Monday is the first day of the week.
    }
});

class TodoForm extends React.Component {
    static minDate = moment().startOf('week');
    static maxDate = moment().startOf('week').day(7);

    state = {
        data: {
            title: this.props.initialData.title || '',
            description: this.props.initialData.description || '',
            status: this.props.initialData.status || 'new',
            date: this.props.initialData.date
                ? moment(this.props.initialData.date).format(DEFAULT_DATE_FORMAT)
                : moment().format(DEFAULT_DATE_FORMAT)
        },

        subTasks: this.props.initialData.sub_tasks
            ? this.props.initialData.sub_tasks.map(task => ({
                _id: task._id,
                title: task.title,
                done: task.status === 'done'
            }))
            : []
    };

    onChange = ({target: {name, value}}) => {
        this.setState(({data}) => ({
            data: {...data, [name]: value}
        }))
    };

    onSubtaskChange = ({target: {name, value, type}}, id) => {
        this.setState(({subTasks}) => ({
            subTasks: subTasks.map(task => {
                if (task._id === id) {
                    return {...task, [name]: type === 'checkbox' ? !task[name] : value}
                }

                return task;
            })
        }));
    };

    onDateChange = (date) => {
        this.setState(({data}) => ({
            data: {...data, date}
        }))
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {data, subTasks} = this.state;
        const todo = {...data};

        if (this.isSubtasksCompleted()) {
            todo.status = 'done';
        }

        todo.sub_tasks = subTasks
            .filter(({title}) => title)
            .map(({title, done}) => ({
                title,
                status: done ? 'done' : 'not_done'
            }));

        this.props.onSubmit(todo);
    };


    addSubtask = () => {
        this.setState(({subTasks}) => ({
            subTasks: [
                ...subTasks,
                {title: '', done: false, _id: uniquid()}
            ]
        }));
    };

    removeSubtask = (id) => {
        this.setState(({subTasks}) => ({
            subTasks: subTasks.filter(item => item._id !== id)
        }));
    };

    isSubtasksCompleted = () => {
        const nonEmptySubTasks = this.state.subTasks
            .filter(({title}) => title.length);

        return !!nonEmptySubTasks.length && nonEmptySubTasks
            .every(({done}) => done);
    };

    render() {
        const {data, subTasks} = this.state;
        const allSubtasksIsCompleted = this.isSubtasksCompleted();
        return (
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        required
                        name="title"
                        className="form-control"
                        id="title"
                        placeholder="Task name"
                        value={data.title}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <textarea
                        type="text"
                        required
                        name="description"
                        className="form-control"
                        id="title"
                        placeholder="Description"
                        value={data.description}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleSelect1">Task status</label>
                    <select
                        className="form-control"
                        name="status"
                        disabled={allSubtasksIsCompleted}
                        value={allSubtasksIsCompleted ? 'done' : data.status}
                        onChange={this.onChange}
                    >
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <Datepicker
                    minDate={TodoForm.minDate}
                    maxDate={TodoForm.maxDate}
                    value={data.date}
                    onChange={this.onDateChange}
                />

                {!!subTasks.length && <h2>Subtasks</h2>}

                <SubtaskList
                    list={subTasks}
                    remove={this.removeSubtask}
                    onChange={this.onSubtaskChange}
                />

                <br/>


                <button
                    className="btn btn-dark"
                    type="button"
                    onClick={this.addSubtask}
                >
                    Add Subtask
                </button>

                <br/>
                <br/>


                <div className="d-flex justify-content-between">
                    <Link className="btn" to="/">Back</Link>

                    <button type="submit" className="btn btn-primary">Save</button>
                </div>

            </form>
        )
    }
}

TodoForm.defaultProps = {
    initialData: {}
};

TodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({})
};

export default TodoForm;