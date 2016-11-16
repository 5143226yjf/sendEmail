/**
 * Created by stonehx on 16-10-14.
 */
function getStorage(item) {
  if (item) {
    return localStorage.getItem("item");
  }else{
    throw new Error('cannot find item');
  }
}
