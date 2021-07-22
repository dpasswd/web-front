import { getSettingInfo, getSettingsInfo, setSettingInfo, setSettingsInfo } from '@/api/setting'

const syssettings = {
  state: {
    siteDomain: '',
    apiKey: '',
    regStatus: 0,
    emailStatus: 0,
    emailSuffix: '',
    defaultQuota: '',
    sEmailStatus: 0,
    sEmailName: '',
    sEmailData: '',
    sLdapStatus: 0,
    sLdapName: '',
    sLdapData: '',
    sDingtaskStatus: 0,
    sDingtaskName: '',
    sDingtaskData: ''
  },

  mutations: {
    SET_SITEDOMAIN: (state, siteDomain) => {
      state.siteDomain = siteDomain
    },
    SET_APIKEY: (state, apiKey) => {
      state.apiKey = apiKey
    },
    SET_REGSTATUS: (state, regStatus) => {
      state.regStatus = regStatus
    },
    SET_EMAILSTATUS: (state, emailStatus) => {
      state.emailStatus = emailStatus
    },
    SET_EMAILSUFFIX: (state, emailSuffix) => {
      state.emailSuffix = emailSuffix
    },
    SET_DEFAULTQUOTA: (state, defaultQuota) => {
      state.defaultQuota = defaultQuota
    },
    SET_SEMAILSTATUS: (state, sEmailStatus) => {
      state.sEmailStatus = sEmailStatus
    },
    SET_SEMAILNAMW: (state, sEmailName) => {
      state.sEmailName = sEmailName
    },
    SET_SEMAILDATA: (state, sEmailData) => {
      state.sEmailData = sEmailData
    },
    SET_SLDAPSTATUS: (state, sLdapStatus) => {
      state.sLdapStatus = sLdapStatus
    },
    SET_SLDAPNAMW: (state, sLdapName) => {
      state.sLdapName = sLdapName
    },
    SET_SLDAPDATA: (state, sLdapData) => {
      state.sLdapData = sLdapData
    },
    SET_SDINGTASKSTATUS: (state, sDingtaskStatus) => {
      state.sDingtaskStatus = sDingtaskStatus
    },
    SET_SDINGTASKNAMW: (state, sDingtaskName) => {
      state.sDingtaskName = sDingtaskName
    },
    SET_SDINGTASKDATA: (state, sDingtaskData) => {
      state.sDingtaskData = sDingtaskData
    }
  },

  actions: {
    // 获取基础设置信息
    GetSettingInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getSettingInfo().then(response => {
          const result = response
          const { siteDomain, apiKey, regStatus, emailStatus, emailSuffix, defaultQuota } = result['data']
          if (result['code'] === 200) {
            commit('SET_SITEDOMAIN', siteDomain)
            commit('SET_APIKEY', apiKey)
            commit('SET_REGSTATUS', regStatus)
            commit('SET_EMAILSTATUS', emailStatus)
            commit('SET_EMAILSUFFIX', emailSuffix)
            commit('SET_DEFAULTQUOTA', defaultQuota)
            resolve()
          } else {
            reject(result['msg'])
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取设置信息
    GetSettingsInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getSettingsInfo().then(response => {
          const result = response
          if (result['code'] === 200) {
            result['data'].forEach(function (buff) {
              if (buff['sName'] === 'dingtask') {
                commit('SET_SDINGTASKSTATUS', buff.sStatus)
                commit('SET_SDINGTASKNAMW', buff.sName)
                commit('SET_SDINGTASKDATA', buff.sData)
              } else if (buff['sName'] === 'LDAP') {
                commit('SET_SLDAPSTATUS', buff.sStatus)
                commit('SET_SLDAPNAMW', buff.sName)
                commit('SET_SLDAPDATA', buff.sData)
              } else if (buff['sName'] === 'EMail') {
                commit('SET_SEMAILSTATUS', buff.sStatus)
                commit('SET_SEMAILNAMW', buff.sName)
                commit('SET_SEMAILDATA', buff.sData)
              }
            })
            resolve()
          } else {
            reject(result['msg'])
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改基础设置信息
    SetSettingInfo ({ commit }, settingInfo) {
      return new Promise((resolve, reject) => {
        setSettingInfo(settingInfo).then(response => {
          const result = response
          if (result['code'] === 200) {
            commit('SET_SITEDOMAIN', settingInfo.siteDomain)
            commit('SET_APIKEY', settingInfo.apiKey)
            commit('SET_REGSTATUS', settingInfo.regStatus)
            commit('SET_EMAILSTATUS', settingInfo.emailStatus)
            commit('SET_EMAILSUFFIX', settingInfo.emailSuffix)
            commit('SET_DEFAULTQUOTA', settingInfo.defaultQuota)
            resolve()
          } else {
            reject(result['msg'])
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改设置信息
    SetSettingsInfo ({ commit }, settingsInfo) {
      return new Promise((resolve, reject) => {
        setSettingsInfo(settingsInfo).then(response => {
          const result = response
          if (result['code'] === 200) {
            if (settingsInfo.sName === 'dingtask') {
              commit('SET_SDINGTASKSTATUS', settingsInfo.sStatus)
              commit('SET_SDINGTASKNAMW', settingsInfo.sName)
              commit('SET_SDINGTASKDATA', settingsInfo.sData)
            } else if (settingsInfo.sName === 'LDAP') {
              commit('SET_SLDAPSTATUS', settingsInfo.sStatus)
              commit('SET_SLDAPNAMW', settingsInfo.sName)
              commit('SET_SLDAPDATA', settingsInfo.sData)
            } else if (settingsInfo.sName === 'EMail') {
              commit('SET_SEMAILSTATUS', settingsInfo.sStatus)
              commit('SET_SEMAILNAMW', settingsInfo.sName)
              commit('SET_SEMAILDATA', settingsInfo.sData)
            }
            resolve()
          } else {
            reject(result['msg'])
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default syssettings
