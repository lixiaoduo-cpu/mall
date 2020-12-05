import {request} from '../store/request';

export function get() {
  return request({
    url: '/home/multidata'
  })
}
