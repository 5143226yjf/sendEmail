/**
 *
 * Created by qoder on 16/7/25.
 */
import {hashHistory} from 'react-router';
export  default function goto(path) {
  if (path) {
    hashHistory.push(path);
  } else {
    throw new Error('path cannot be null!');
  }
}
