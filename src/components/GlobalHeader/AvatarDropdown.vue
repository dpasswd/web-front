<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="avatarUrl" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentUser.name }}</span>
    </span>
    <template #overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          {{ $t('menu.account.set-pwd') }}
          <a-drawer
            title="修改密码"
            width="640"
            placement="left"
            :closable="false"
            :visible="visiblePWD"
            @close="onClosePWD"
          >
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item label="老密码">
                <a-input-password
                  v-decorator="[
                    'oldPassword',
                    {
                      rules: [{ required: true, message: 'oldPassword is required!' }],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="新密码">
                <a-input-password
                  size="large"
                  @click="handlePasswordInputClick"
                  v-decorator="[
                    'password',
                    {
                      rules: [{ required: true, message: $t('user.password.required') }],
                    },
                  ]"
                ></a-input-password>
              </a-form-item>
              <a-form-item>
                <a-input-password
                  size="large"
                  v-decorator="[
                    'password2',
                    {
                      rules: [{ required: true, message: $t('user.password.required') }],
                    },
                  ]"
                ></a-input-password>
              </a-form-item>
              <a-button type="primary" html-type="submit">
                修改
              </a-button>
            </a-form>
          </a-drawer>
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          {{ $t('menu.account.settings') }}
          <a-drawer
            title="个人设置"
            width="640"
            placement="left"
            :closable="false"
            :visible="visible"
            @close="onClose"
          >
            <div class="account-settings-info-view">
              <a-row :gutter="16" type="flex" justify="center">
                <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
                  <a-form :form="infoForm" @submit="handleSubmitInfo">
                    <a-form-item :label="$t('account.settings.basic.nickname')" >
                      <a-input
                        v-decorator="[
                          'nickname',
                          {
                            rules: [{ required: true, message: $t('user.nickname.required') }],
                            initialValue: userInfo.nickName
                          },
                        ]"
                      />
                    </a-form-item>
                    <a-form-item
                      label="公钥"
                    >
                      <a-textarea
                        rows="4"
                        v-decorator="[
                          'publicKey',
                          {
                            rules: [{ required: true, message: $t('user.publick key.required') }],
                            initialValue: userInfo.publicKey
                          },
                        ]"
                      />
                    </a-form-item>
                    <a-form-item
                      :label="$t('account.settings.basic.email')"
                      :required="false"
                    >
                      <a-input disabled :value="userInfo.email" placeholder="example@ant.design"/>
                    </a-form-item>
                    <a-form-item
                      label="磁盘限额(MB)"
                      :required="false"
                    >
                      <a-input disabled :value="userInfo.quota" placeholder="1024"/>
                    </a-form-item>
                    <a-form-item
                      label="手机"
                      :required="false"
                    >
                      <a-input
                        v-decorator="[
                          'phone',
                          {
                            rules: [{ required: true, message: $t('user.phone.required') }],
                            initialValue: userInfo.phone
                          },
                        ]"
                      />
                    </a-form-item>
                    <a-form-item>
                      <a-button html-type="submit" type="primary">{{ $t('account.settings.basic.update') }}</a-button>
                    </a-form-item>
                  </a-form>
                </a-col>
                <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
                  <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
                    <a-icon type="cloud-upload-o" class="upload-icon"/>
                    <div class="mask">
                      <a-icon type="plus" />
                    </div>
                    <img :src="option.img"/>
                  </div>
                </a-col>
              </a-row>
              <avatar-modal ref="modal" @ok="setavatar"/>
            </div>
          </a-drawer>
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t('menu.account.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { scorePassword } from '@/utils/util'
import AvatarModal from './AvatarModal'
import { setPwd, setUserInfo } from '@/api/users'
import defaultSettings from '@/config/defaultSettings'
import md5 from 'md5'
const levelNames = {
  0: 'user.password.strength.short',
  1: 'user.password.strength.low',
  2: 'user.password.strength.medium',
  3: 'user.password.strength.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

export default {
  name: 'AvatarDropdown',
  components: {
    AvatarModal
  },
  data () {
    return {
      uploadUrl: '',
      avatarUrl: '',
      isMobile: false,
      visible: false,
      visiblePWD: false,
      loading: false,
      userInfo: {},
      headers: {
          Authorization: 'Bearer ' + this.$store.getters.token
      },
      pStyle2: {
        marginBottom: '24px'
      },
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      form: this.$form.createForm(this),
      infoForm: this.$form.createForm(this),
      state: {
        time: 60,
        level: 0,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  created () {
    this.userInfo = this.$store.getters.userInfo
    this.uploadUrl = defaultSettings.baseURL + 'api/v1/user/avatar'
    this.avatarUrl = defaultSettings.baseURL + this.userInfo['avatar']
    this.option.img = this.avatarUrl
    // console.log(this.userInfo)
  },
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setavatar (url) {
      this.option.img = url
    },
    handlePasswordInputClick () {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },
    handlePasswordLevel (rule, value, callback) {
      if (value === '') {
       return callback()
      }
      // console.log('scorePassword ; ', scorePassword(value))
      if (value.length >= 6) {
        if (scorePassword(value) >= 30) {
          this.state.level = 1
        }
        if (scorePassword(value) >= 60) {
        this.state.level = 2
        }
        if (scorePassword(value) >= 80) {
        this.state.level = 3
        }
      } else {
        this.state.level = 0
        callback(new Error(this.$t('user.password.strength.msg')))
      }
      this.state.passwordLevel = this.state.level
      this.state.percent = this.state.level * 33

      callback()
    },
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error(this.$t('user.password.required')))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(this.$t('user.password.twice.msg')))
      }
      callback()
    },
    handleSubmitInfo (e) {
      e.preventDefault()
      const {
        infoForm: { validateFields }
      } = this
      const validateFieldsKey = [ 'nickname', 'phone', 'publicKey' ]
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
            const params = { }
            params['nickname'] = values['nickname']
            params['telephone'] = values['phone']
            params['publicKey'] = values['publicKey']
            setUserInfo(params).then(res => {
            if (res['code'] === 200) {
              this.$message.error('修改成功')
            } else {
              console.log(res)
              this.$message.error('修改失败:' + res['msg'])
            }
          })
          // this.$store.commit('update', values)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = [ 'password2', 'password', 'oldPassword' ]
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          if (values.password !== values.password2) {
            this.$message.error('密码不一致')
          } else {
            const params = { }
            params['oldPassword'] = md5(values.oldPassword)
            params['newPassword'] = md5(values.password)
            setPwd(params).then(res => {
            if (res['code'] === 200) {
              console.log(res)
              this.$message.error('修改成功')
            } else {
              console.log(res)
              this.$message.error('修改失败:' + res['msg'])
            }
          })
            console.log('Received values of form: ', params)
          }
          // this.$store.commit('update', values)
        }
      })
    },
    handleToCenter () {
      // this.$router.push({ path: '/account/center' })
      this.visiblePWD = true
    },
    handleToSettings () {
      // this.$router.push({ path: '/account/settings' })
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    onClosePWD () {
      this.visiblePWD = false
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.avatar {
  width: 256px;
  height: 256px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }
  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;
      &:hover {
        opacity: 1;
      }
      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }
    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
