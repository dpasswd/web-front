import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
// import { tupleExpression } from '../../../../../Library/Caches/typescript/3.9/node_modules/@babel/types/lib/index'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param roles
 * @param route
 * @returns {boolean}
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.permission && route.meta.permission.length > 0) {
    if (roles.length <= 0) return false
    // console.log(roles.roles)
    if (roles.permissions === '*:*:*') return true
    return roles.roles.filter(role => {
      // 检查每个角色，是否有权读取该路由
      for (let i = 0, len = roles.permissions.length; i < len; i++) {
        for (let ii = 0, leng = roles.permissions[i].split(':').length; ii < leng; ii++) {
          // console.log(roles.permissions[i].split(':')[ii], route.meta.permission[0])
          if (roles.permissions[i].split(':')[ii] === route.meta.permission[0]) {
            // if (route.meta.permission.includes(roles.permissions[i])) {
              return true
              // for (const action of roles.permissions[i].actionEntitySet) {
              //   if (action.action === 'read') return action.value
              // }
            }
        }
      }
      return false
    }).length > 0
  }
  // 对于没有配置meta或者permission的route，默认允许展示菜单
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  // console.log('roles is', roles)
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.roleId)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, roles) {
  return routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit, store }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const { isSuperuser } = data
        let accessedRouters
        if (isSuperuser) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
