import request from '@/utils/request'

// 获取行程
export function getAdminTrips(data) {
  return request({
    url: '/api/getAdminTrips',
    method: 'get',
    params: data
  })
}

export function closeMyList(data) {
  return request({
    url: '/api/closeMyList',
    method: 'post',
    data
  })
}
export function getAdminUsers(data) {
  return request({
    url: '/api/getAdminUsers',
    method: 'get',
    params: data
  })
}
// 举报列表
export function getAdminReports(data) {
  return request({
    url: '/api/getAdminReports',
    method: 'get',
    params: data
  })
}

export function login(data) {
  return request({
    url: '/api/adminLogin',
    method: 'post',
    data
  })
}
// 登出
export function logout(data) {
  return request({
    url: '/api/logout',
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/api/getUserList',
    method: 'get',
    params: data
  })
}
