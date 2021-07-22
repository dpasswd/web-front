// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/backup',
    children: [
    // dashboard
      // dashboard
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('@/views/account/center/index'),
      //   meta: { title: '用户管理', keepAlive: true, icon: 'user', permission: [ 'user' ] }
      // },
      // backup
      {
        path: '/backup',
        name: 'backup',
        component: () => import('@/views/backup/BackupList'),
        meta: { title: '备份', keepAlive: true, icon: 'copy', permission: [ 'backup' ] }
      },
      // share
      {
        path: '/share',
        name: 'share',
        component: () => import('@/views/share/index'),
        meta: { title: '分享', keepAlive: true, icon: 'share-alt', permission: [ 'share' ] }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/account/UsersManager/Index'),
        meta: { title: '用户管理', keepAlive: true, icon: 'user', permission: [ 'users' ] }
      },
      {
        path: '/sysconfig/settings',
        name: 'settings',
        component: () => import('@/views/sysconfig/settings/Index'),
        meta: { title: '系统设置', hideHeader: true, icon: 'dashboard', permission: ['system'] },
        redirect: '/sysconfig/settings/basic',
        hideInMenu: true,
        children: [
          {
            path: '/sysconfig/settings/basic',
            name: 'BasicSettings',
            component: () => import('@/views/sysconfig/settings/BasicSetting'),
            meta: { title: '常规设置', hidden: true, permission: ['system'] }
          },
          {
            path: '/sysconfig/settings/notification',
            name: 'NotificationSettings',
            component: () => import('@/views/sysconfig/settings/Notification'),
            meta: { title: '消息通知', hidden: true, keepAlive: true, permission: ['system']
            }
          },
          {
            path: '/sysconfig/settings/security',
            name: 'SecuritySettings',
            component: () => import('@/views/sysconfig/settings/Security'),
            meta: { title: '登陆设置', hidden: true, keepAlive: true, permission: ['system']
            }
          },
          {
            path: '/sysconfig/settings/updateVersion',
            name: 'Update',
            component: () => import('@/views/sysconfig/settings/Update'),
            meta: { title: '版本更新', hidden: true, keepAlive: true, permission: ['system'] }
          }
        ]
      },
      // passwd
      {
        path: '/passwd',
        name: 'passwd',
        component: () => import('@/views/user/Passwd'),
        hidden: true,
        meta: { title: '首次登录密码更改', keepAlive: true, icon: 'copy', permission: [ 'backup' ] }
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'activate',
        name: 'activate',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Activate')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/publicshare/key',
    name: 'publicshare',
    component: () => import(/* webpackChunkName: "user" */ '@/views/share/public')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
