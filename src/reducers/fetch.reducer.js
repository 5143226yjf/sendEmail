/**
 * Created by stonehx on 16-10-10.
 */
import {RECEIVE_POSTS,REQUEST_PSOTS} from '../actions/const';

function isFetch(state={
  isFetching:false
},action) {

  switch (action.type){
    case RECEIVE_POSTS:
      return Object.assign({},state,{
        isFetching:false,
      });
    case REQUEST_PSOTS:
      return Object.assign({},state,{
        isFetching:true,
      });
    default:
      return state
  }
}

export default isFetch;
