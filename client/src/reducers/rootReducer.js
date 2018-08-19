import { combineReducers } from 'redux';
import * as todoActions from './todo';

export default combineReducers({
    ...todoActions
});