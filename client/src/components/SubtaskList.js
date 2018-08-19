import React from 'react';
import PropTypes from 'prop-types';

import InputCheckbox from "./InputCheckbox";

const SubtaskList = ({list, onChange, remove}) => (
    <ul>
        {list.map((item) => (
            <div className="d-flex form-group" key={item._id}>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={item.title}
                    onChange={(e) => onChange(e, item._id)}
                />

                <InputCheckbox
                    name="done"
                    checked={item.done}
                    onChange={(e) => onChange(e, item._id)}
                />

                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => remove(item._id)}
                >X
                </button>
            </div>
        ))}
    </ul>
);

SubtaskList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onChange: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default SubtaskList;