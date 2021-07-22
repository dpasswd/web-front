import request from '@/utils/request'

const userApi = {
  Login: '/api/v1/auth/login',
  Logout: '/api/v1/user/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  UserInfo: '/api/v1/user/info',
  QuotaSize: '/api/v1/backup/size',
  UserMenu: '/user/nav'
}

/**
 * 登陆
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

/**
 * 验证码
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取用户信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取用户配额
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getQuotaInfo () {
  return request({
    url: userApi.QuotaSize,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取菜单
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

/**
 * 登出
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
