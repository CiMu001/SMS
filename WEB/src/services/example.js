import request from '../utils/request';

export function query() {
  return request('/api/home');
}

export async function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params
  });
}


export async function test_query(params) {
  console.log('test_query')
  return request('/api/user/test', {
    mtehod:'POST',
    body: {
      ...params,
      method: 'post',
    }
  });
}