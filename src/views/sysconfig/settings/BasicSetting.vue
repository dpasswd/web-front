<template>
  <div>
    <a-row class="row-basic">
      <a-col :span="10" class="row-left">
        <label> API域名 </label>
      </a-col>
      <a-col :span="14" class="row-right">
        <a-input id="sd" placeholder="http://localhost" v-model="settingInfo.siteDomain" />
      </a-col>
    </a-row>
    <a-divider />
    <a-row class="row-basic">
      <a-col :span="10" class="row-left">
        <label> API密钥 </label>
      </a-col>
      <a-col :span="14" class="row-right">
        <a-input-password placeholder="input password" v-model="settingInfo.apiKey" />
      </a-col>
    </a-row>
    <a-divider />
    <a-row class="row-basic">
      <a-col :span="10" class="row-left">
        <label> 停止新用户注册 </label>
      </a-col>
      <a-col :span="14" class="row-right">
        <a-switch checked-children="开" un-checked-children="关" v-model="rStatus" @change="onRegChange"/>
      </a-col>
    </a-row>
    <a-divider />
    <a-row class="row-basic">
      <a-col :span="10" class="row-left">
        <label> 邮箱后缀验证 </label>
      </a-col>
      <a-col :span="14" class="row-right">
        <a-switch checked-children="开" un-checked-children="关" v-model="eStatus" @change="onEmailChange"/>
      </a-col>
    </a-row>
    <a-divider />
    <a-row class="row-basic">
      <a-col :span="10" class="row-left">
        <label> 邮箱后缀白名单 </label>
      </a-col>
      <a-col :span="14" class="row-right">
        <a-input placeholder="qq.com,163.com" v-model="settingInfo.emailSuffix" />
      </a-col>
    </a-row>
    <a-divider />
    <a-row class="row-basic">
      <a-col :span="10" class="row-left">
        <label> 默认存储配额 </label>
      </a-col>
      <a-col :span="14" class="row-right">
        <a-input placeholder="100" suffix="MB" v-model="settingInfo.defaultQuota"/>
      </a-col>
    </a-row>
    <a-divider />
    <a-button type="primary" @click="onCommit" block>
      提交
    </a-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BasicSetting',
  components: {
  },
  data () {
    return {
      eStatus: false,
      rStatus: false,
      settingInfo: {
        emailStatus: this.$store.getters.emailStatus,
        regStatus: this.$store.getters.emailStatus,
        siteDomain: this.$store.getters.siteDomain,
        apiKey: this.$store.getters.apiKey,
        emailSuffix: this.$store.getters.emailSuffix,
        defaultQuota: this.$store.getters.defaultQuota
      }
    }
  },
  beforeCreate () {
    // this.getSettingInfo()
  },
  created () {
      if (this.$store.getters.emailStatus === 1) {
        this.eStatus = true
      }
      if (this.$store.getters.regStatus === 1) {
        this.rStatus = true
      }
  },
  methods: {
    ...mapActions(['GetSettingInfo', 'SetSettingInfo']),
    onRegChange (rStatus) {
      if (rStatus === true) {
        this.settingInfo.regStatus = 1
      } else {
        this.settingInfo.regStatus = 2
      }
    },
    onEmailChange (eStatus) {
      if (eStatus === true) {
        this.settingInfo.emailStatus = 1
      } else {
        this.settingInfo.emailStatus = 2
      }
    },
    onCommit (event) {
      // this.$store.commit('SET_SITEDOMAIN', this.settingInfo.siteDomain)
      this.SetSettingInfo(this.settingInfo)
    },
    getSettingInfo () {
      this.GetSettingInfo()
    }
  }
}
</script>

<style lang="less" scoped>
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
