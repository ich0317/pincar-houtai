import request from '@/utils/request'

// 获取行程
export function getAdminTrips(data) {
  return request({
    url: '/carAdminApi/getAdminTrips',
    method: 'get',
    params: data
  })
}

export function setFrozenTrip(data) {
  return request({
    url: '/carAdminApi/setFrozenTrip',
    method: 'post',
    data
  })
}
export function getAdminUsers(data) {
  return request({
    url: '/carAdminApi/getAdminUsers',
    method: 'get',
    params: data
  })
}
// 举报列表
export function getAdminReports(data) {
  return request({
    url: '/carAdminApi/getAdminReports',
    method: 'get',
    params: data
  })
}

export function login(data) {
  return request({
    url: '/carAdminApi/adminLogin',
    method: 'post',
    data
  })
}
// 登出
export function logout(data) {
  return request({
    url: '/carAdminApi/logout',
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/carAdminApi/getUserList',
    method: 'get',
    params: data
  })
}
// 建议
export function getAdminSuggests(data) {
  return request({
    url: '/carAdminApi/getAdminSuggests',
    method: 'get',
    params: data
  })
}
// 操作用户
export function isUseUser(data) {
  return request({
    url: '/carAdminApi/isUseUser',
    method: 'post',
    data
  })
}
