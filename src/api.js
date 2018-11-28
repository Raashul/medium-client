import axios from 'axios';
import _ from 'lodash';

import { getToken } from './auth';


if (!_.isString(process.env.REACT_APP_URL))
  {throw new Error(`you should define a REACT_APP_URL in a ".env"
    or ".env.local" at the root of the project`);}


//create instance of axois with config
const api = axios.create({baseURL: process.env.REACT_APP_URL});

//add auth token to request
// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `${getToken()}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export function getHomeScreenData() {
  return api.get('/api/home');
}

export function postNewStory(payload) {
  console.log(payload);
  return "test";
}
