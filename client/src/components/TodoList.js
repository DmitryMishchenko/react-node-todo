import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './TodoListItem';

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

const TodoList = ({todos, removeTodo}) => (
    Object.keys(todos).map((dateKey, dateIndex) => (
        <div key={dateKey}>
            <h4>{daysOfWeek[dateIndex]} ({dateKey})</h4>

            {!!todos[dateKey].length ? <ul style={{paddingLeft: 0}}>
                {todos[dateKey].map(todo => (
                    <TodoListItem
                        key={todo._id}
                        data={todo}
                        removeTodo={removeTodo}
                    />
                ))}
            </ul> : <p>No task for this date...</p>

            }
        </div>
    ))
);

TodoList.propTypes = {
    todos: PropTypes.shape({}).isRequired,
    removeTodo: PropTypes.func.isRequired,
};

export default TodoList;