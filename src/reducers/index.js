/**
 * Created by stonehx on 16-10-7.
 */
import { combineReducers } from 'redux';
import isFetch from './fetch.reducer'


const todoApp = combineReducers({
  isFetch
});

export default todoApp;
