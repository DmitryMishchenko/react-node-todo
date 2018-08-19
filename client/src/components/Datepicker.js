import React from 'react';
import {Calendar} from 'react-date-range';
import moment from 'moment';
import PropTypes from 'prop-types';

import {DEFAULT_DATE_FORMAT} from '../constants/dates';


const DatePicker = ({onChange, minDate, maxDate, value}) => {
    const handleChange = (date) => {
        onChange(date.format(DEFAULT_DATE_FORMAT));
    };

    return (
        <Calendar
            firstDayOfWeek={1}
            onChange={handleChange}
            minDate={minDate}
            maxDate={maxDate}
            date={moment(value)}
        />
    );
};

DatePicker.defaultProps = {
    minDate: null,
    maxDate: null
};

DatePicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DatePicker;