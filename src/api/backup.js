import request from '@/utils/request'

const userApi = {
  BackupList: '/api/v1/backup/list',
  BackupItem: '/api/v1/backup/item',
  BackupDownload: '/api/v1/backup/download'
}

/**
 * 根据userid查询备份列表
 * parameter: {
 *     user_id: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function getBackupListByUserId (parameter) {
  return request({
    url: userApi.BackupList,
    method: 'get',
    params: parameter
  })
}

/**
 * 根据备份名获取备份信息
 * parameter: {
 *     backup_name: ''
 * }
 * @param parameter
 * @returns {*}
 */
export function getBackupByBackupName (parameter) {
  return request({
    url: userApi.BackupDownload,
    method: 'get',
    params: parameter
  })
}

/**
 * 删除备份
 * parameter: {
 *    user_id: 1111,
 *    backup_id: 1111
 * }
 * @param parameter
 * @returns {*}
 */
 export function delBackupItem (parameter) {
  return request({
    url: userApi.BackupItem,
    method: 'delete',
    params: parameter
  })
}
