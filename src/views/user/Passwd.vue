<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="main">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          style="marginLeft: 30%;marginTop: 20px"
          @submit="handleSubmit"
        >
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
          <a-form-item :labelCol="labelCol" hasFeedback :wrapperCol="wrapperCol">
            <a-input
              size="large"
              type="text"
              disabled
              placeholder="账户"
              v-decorator="[
                'userName',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <!-- <a-form-item :labelCol="labelCol" hasFeedback :wrapperCol="wrapperCol">
            <a-input-password
              size="large"
              placeholder="密码"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item> -->
          <a-form-item :labelCol="labelCol" hasFeedback :wrapperCol="wrapperCol">
            <a-input-password
              size="large"
              placeholder="新密码"
              v-decorator="[
                'newPassword',
                {rules: [{ required: true, message: '请输入新密码，最小6位数', min: 6 }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
          <a-form-item :labelCol="labelCol" hasFeedback :wrapperCol="wrapperCol">
            <a-input-password
              size="large"
              placeholder="校验新密码"
              v-decorator="[
                'checkPassword',
                {rules: [{ required: true, message: '请再次输入新密码，最小6位数', min: 6 }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
          <a-form-item style="margin-top:24px" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-button
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >确定</a-button>
            <a-divider type="vertical"/>
          </a-form-item>
        </a-form>
        <a-divider />
        <div class="step-form-style-desc" style="marginLeft: 30%">
          <h3>说明</h3>
          <h4>使用AMS账号登陆</h4>
          <p>默认会设置一个随机密码，用户第一次登陆的时候需要重新设置密码</p>
          <h4>密码客户端</h4>
          <p>用户可以通过初始化的密码登陆密码客户端</p>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { setPwd } from '@/api/users'
import md5 from 'md5'

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      labelCol: {
        xs: { span: 26 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      userName: this.$store.getters.userInfo.userName,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0
      }
    }
  },
  created () {
    this.getInit()
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'GetSettingInfo', 'GetSettingsInfo']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    getInit () {
      this.form.getFieldsValue(['userName'])
      this.form.setFieldsValue({ userName: this.userName })
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this

      const validateFieldsKey = [ 'username', 'password', 'newPassword', 'checkPassword' ]
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          if (values.newPassword !== values.checkPassword) {
            this.$message.error('密码不一致')
          } else {
            const params = { }
            params['firstLogin'] = 1
            params['newPassword'] = md5(values.newPassword)
            setPwd(params).then(res => {
            if (res['code'] === 200) {
              this.loginSuccess()
              // this.$message.error('修改成功')
            } else {
              this.$message.error('修改失败:' + res['msg'])
            }
            })
          }
        }
      })
    },
    loginSuccess (res) {
      // console.log(this.$store.getters.userInfo.roles.length)
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '密码修改成功',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      if (err === 'ldap') {
        this.ldapLogin('t')
      } else {
        this.isLoginError = true
        this.$notification['error']({
        message: '错误',
        // description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        description: ((err.response || {}).data || {}).message || err,
        duration: 4
      })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);
  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }
  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }
  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
