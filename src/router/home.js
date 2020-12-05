import {request} from '../store/request';

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}



