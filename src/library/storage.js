/**
 * Created by stonehx on 16-10-14.
 */
function storage(agreement,token){
  if(agreement&&token){
      localStorage.setItem('token',token);
  }
}
export default storage;
