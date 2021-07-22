import request from '@/utils/request'

const userApi = {
  SysBasic: '/api/v1/sysbasic/info',
  SysSet: '/api/v1/syssets/info'
}

/**
 * 获取基础设置信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getSettingInfo () {
  return request({
    url: userApi.SysBasic,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 设置基础设置信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function setSettingInfo (parameter) {
  return request({
    url: userApi.SysBasic,
    method: 'put',
    data: parameter
  })
}

/**
 * 获取配置信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getSettingsInfo () {
  return request({
    url: userApi.SysSet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 设置配置信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function setSettingsInfo (parameter) {
  return request({
    url: userApi.SysSet,
    method: 'put',
    data: parameter
  })
}
