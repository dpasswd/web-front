import request from '@/utils/request'

const userApi = {
  ShareList: '/api/v1/share/list',
  ShareItem: '/api/v1/share/item',
  GetShareInfo: '/share/key'
}

/**
 * 获取分享列表
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function getShareList (parameter) {
  return request({
    url: userApi.ShareList,
    method: 'get',
    params: parameter
  })
}

/**
 * 修改分享信息
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function setShareItem (parameter) {
  return request({
    url: userApi.ShareItem,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取分享内容
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
 export function getShareItem (parameter) {
  return request({
    url: userApi.GetShareInfo,
    method: 'get',
    params: parameter
  })
}
