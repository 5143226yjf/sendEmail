/**
 * Created by stonehx on 16-10-10.
 */
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {login} from '../../actions'
import Login from '../../components/auth/login';


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


export default connect(mapStateToProps,mapDispatchToProps)(Login);
