<template>
  <div>
    <a-page-header class="page-header" title="LDAP" >
      <template slot="tags">
        <a-switch checked-children="开" un-checked-children="关" v-model="ldapStatus" @change="onLdapChange" />
      </template>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> LDAP服务器地址 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="ldap.xxx.cn:636" v-model="ldapInfo.data.ldapAddr"/>
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> LDAP绑定地址 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="cn=admin,dc=dhpassword,dc=com" v-model="ldapInfo.data.ldapBind"/>
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> LDAP密码 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input-password placeholder="input password" v-model="ldapInfo.data.ldapPwd"/>
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> 用户OU </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="ou=users,dc=dhpassword,dc=com" v-model="ldapInfo.data.ou"/>
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> LDAP属性映射 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder='{"username": "cn", "nickname":"name", "email":"mail", "phone":"tel"}' v-model="ldapInfo.data.map"/>
        </a-col>
      </a-row>
    </a-page-header>
    <p></p>
    <a-button type="primary" @click="onCommit" block>
      提交
    </a-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      ldapStatus: false,
      postParams: {
        sName: '',
        sData: '',
        sStatus: 0
      },
      changeStatus: true,
      ldapInfo: {
        status: this.$store.getters.sLdapStatus,
        data: {}
      }
    }
  },
  created () {
    if (this.$store.getters.sLdapStatus === 1) {
      this.ldapStatus = true
    }
    if (this.$store.getters.sLdapData !== '') {
      this.ldapInfo.data = JSON.parse(this.$store.getters.sLdapData)
    }
  },
  methods: {
    ...mapActions(['SetSettingsInfo']),
    success () {
      this.$success({
        title: 'success',
        content: '更新成功'
      })
    },
    warningNoChange () {
      this.$warning({
        title: 'warning',
        content: '没有变化'
      })
    },
    onLdapChange (ldapStatus) {
      if (ldapStatus === true) {
        // this.settingInfo.sEmailStatus = 1
        this.ldapInfo.data.status = 1
      } else {
        // this.settingInfo.sEmailStatus = 0
        this.ldapInfo.data.status = 0
      }
    },
    onCommit (e) {
      if (JSON.stringify(this.ldapInfo.data) !== this.$store.getters.sLdapData) {
        this.changeStatus = false
        var bufL = Object.assign({}, this.postParams)
        bufL.sName = 'LDAP'
        bufL.sData = JSON.stringify(this.ldapInfo.data)
        bufL.sStatus = this.ldapInfo.data.status
        try {
          this.SetSettingsInfo(bufL)
        } catch (err) {
          alert(err)
        }
      }
      if (this.changeStatus) {
        this.warningNoChange()
      } else {
        this.success()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page-header {
    border: 1px solid rgb(235, 237, 240);
  }
  .page-header > .in {
     display: inline-block;
  }
  .row-basic {
    line-height: 240%;
    margin-bottom:-10px;
    margin-top:-10px;
  }
  .row-basic .row-left {
    background: #f2f1f1;
    color: rgb(0, 0, 0);
    text-align: left;
    font-size: 100%;
  }
  .row-basic .row-right{
    background: rgb(255, 255, 255);
    color: #fff;
    text-align: right;
  }
  .row-basic > .ant-layout:last-child {
    margin: 0;
  }
</style>
