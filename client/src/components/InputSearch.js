import React from 'react';

const InputSearch = (props) => (
    <div
        className="form-group"
        style={{
            marginBottom: 0
        }}
    >
        <input
            className="form-control"
            type="text"
            placeholder="Search..."
            {...props}
        />
    </div>
);

export default InputSearch;