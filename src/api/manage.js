import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

/**
 * 获取用户列表
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取角色列表
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取服务列表
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取权限
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}
