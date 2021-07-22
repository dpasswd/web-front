import request from '@/utils/request'

const userApi = {
  UserInfo: '/api/v1/user/info',
  AdminUserInfo: '/api/v1/sysbasic/userinfo',
  DelUsers: '/api/v1/sysbasic/users',
  Register: '/api/v1/register',
  Activate: '/api/v1/activate',
  Pwd: '/api/v1/user/pwd',
  AllUser: '/api/v1/sysbasic/alluser'
}

/**
 * 管理员修改用户信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function adminSetUserInfo (parameter) {
  return request({
    url: userApi.AdminUserInfo,
    method: 'post',
    data: parameter
  })
}

/**
 * 删除用户
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function delUsers (parameter) {
  return request({
    url: userApi.DelUsers,
    method: 'delete',
    params: parameter
  })
}

/**
 * 设置用户信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function setUserInfo (parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户注册
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function registerUser (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}

/**
 * 修改密码
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function setPwd (parameter) {
  return request({
    url: userApi.Pwd,
    method: 'put',
    data: parameter
  })
}

/**
 * 激活用户
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function activateUser (parameter) {
  return request({
    url: userApi.Activate,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取用户列表
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function getAllUser (parameter) {
  return request({
    url: userApi.AllUser,
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
