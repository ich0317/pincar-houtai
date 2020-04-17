import request from '@/utils/request'

// 获取行程
export function getAdminTrips(data) {
  return request({
    url: '/bapi/getAdminTrips',
    method: 'get',
    params: data
  })
}

export function closeMyList(data) {
  return request({
    url: '/bapi/closeMyList',
    method: 'post',
    data
  })
}
export function getAdminUsers(data) {
  return request({
    url: '/bapi/getAdminUsers',
    method: 'get',
    params: data
  })
}
// 举报列表
export function getAdminReports(data) {
  return request({
    url: '/bapi/getAdminReports',
    method: 'get',
    params: data
  })
}

export function login(data) {
  return request({
    url: '/bapi/adminLogin',
    method: 'post',
    data
  })
}
// 登出
export function logout(data) {
  return request({
    url: '/bapi/logout',
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/bapi/getUserList',
    method: 'get',
    params: data
  })
}
// 建议
export function getAdminSuggests(data) {
  return request({
    url: '/bapi/getAdminSuggests',
    method: 'get',
    params: data
  })
}
// 操作用户
export function isUseUser(data) {
  return request({
    url: '/bapi/isUseUser',
    method: 'post',
    data
  })
}
