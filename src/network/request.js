import axios from 'axios';

export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  });

  //2.配置拦截器
  instance.interceptors.request.use(config => {
    return config;
  },err => {
    console.log(err);
  });

  return instance(config)

}
