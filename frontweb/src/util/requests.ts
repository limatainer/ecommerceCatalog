import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

//trabalhar a analise dos tokens e sua validade

//token para role

//tipos para a resposta do login

type LoginData = {
  username: string;
  password: string;
}


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
  }
  const data = qs.stringify({ //esse stringfy funciona diferente do usado no localstorage
    ...loginData,
    grant_type: 'password'
  });
  return axios({ method: 'POST', baseURL: BASE_URL, url: '/oauth/token', data, headers })
}

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials ? {
    ...config.headers,
    Authorization: "Bearer " + getAuthData().access_token
  } : config.headers
  return axios({ ...config, baseURL: BASE_URL, headers });
}


//Axios interceptors history

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    history.push('/admin/auth')
  }
  return Promise.reject(error);
});

//funcao para trabalhar a validacao dos tokens


//funcao para perguntar se a pessoa esta autenticada e vou trabalhar com a unix timestamp gerada pelo token

