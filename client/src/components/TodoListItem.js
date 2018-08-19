import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const themeSchema = {
    done: 'alert-success',
    in_progress: 'alert-warning',
    new: 'alert-primary'
};

const TodoListItem = ({removeTodo, data}) => (
    <div className="d-flex"  style={{marginBottom: '10px'}}>
        <Link
            to={data._id}
            className={`d-block ${themeSchema[data.status]}`}
            style={{
                width: 'calc(100% - 32px)',
                paddingLeft: '10px'
            }}
        >
            {data.title}
        </Link>
        <button
            type="button"
            className="btn btn-danger"
            onClick={() => removeTodo(data._id)}
        >
            X
        </button>
    </div>
);

TodoListItem.propTypes = {
    data: PropTypes.shape({}).isRequired,
    removeTodo: PropTypes.func.isRequired,
};


export default TodoListItem;