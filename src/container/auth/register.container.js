/**
 * Created by yjf on 16-10-11.
 */
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {login} from '../../actions';
import Register from '../../components/auth/register';

function mapStateToProps(state) {
  return{

  }
}


function mapDispatchToProps(dispatch) {
  return {
    action:bindActionCreators({
      login
    }, dispatch)
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);
