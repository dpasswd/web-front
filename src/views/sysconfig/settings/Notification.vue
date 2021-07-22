<template>
  <div>
    <a-page-header class="page-header" title="邮件设置" >
      <template slot="tags">
        <a-switch checked-children="开" un-checked-children="关" v-model="emailStatus" @change="onEmailChange" />
      </template>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> SMTP服务器地址 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="smtp.qq.com" v-model="emailInfo.data.smtpAddr" />
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> SMTP服务端口 </label>
          <a-popover title="常见的端口有25, 465, 587">
            <a-icon type="info-circle" />
          </a-popover>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="465" v-model="emailInfo.data.smtpPort" />
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> SMTP加密方式 </label>
          <a-popover title="465端口加密方式一般为SSL，587端口加密方式一般为TLS">
            <a-icon type="info-circle" />
          </a-popover>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-select placeholder="选择加密方式" style="width: 100%" v-model="smtpDefault" @change="smtpSeChange" >
            <a-select-option v-for="(item, index) in smtpSe" :key="index" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> SMTP账号 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="test@qq.com" v-model="emailInfo.data.smtpAccount" />
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> SMTP密码 </label>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input-password placeholder="input password" v-model="emailInfo.data.smtpPwd" />
        </a-col>
      </a-row>
    </a-page-header>
    <a-page-header class="page-header" title="钉钉设置" >
      <template slot="tags">
        <a-switch checked-children="开" un-checked-children="关" v-model="dingStatus" @change="onDingChange" />
      </template>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> AppKey </label>
          <a-popover title="企业内部应用AppKey">
            <a-icon type="info-circle" />
          </a-popover>
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="121111111" v-model="dingtaskInfo.data.AppKey"/>
        </a-col>
      </a-row>
      <a-divider />
      <a-row class="row-basic">
        <a-col :span="10" class="row-left">
          <label> AppSecret </label>
          <a-popover title="企业内部应用AppSecret">
            <a-icon type="info-circle" />
          </a-popover>
          <!-- <a-tooltip slot="suffix" title="Extra information"></a-tooltip> -->
        </a-col>
        <a-col :span="14" class="row-right">
          <a-input placeholder="default" v-model="dingtaskInfo.data.AppSecret" />
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
      emailStatus: false,
      dingStatus: false,
      smtpDefault: 'NULL',
      postParams: {
        sName: '',
        sData: '',
        sStatus: 0
      },
      smtpSe: ['NULL', 'SSL', 'TLS'],
      changeStatus: true,
      emailInfo: {
        status: this.$store.getters.sEmailStatus,
        data: {}
      },
      dingtaskInfo: {
        status: this.$store.getters.sDingtaskStatus,
        data: {}
      }
    }
  },
  created () {
    if (this.$store.getters.sEmailStatus === 1) {
      this.emailStatus = true
    }
    if (this.$store.getters.sDingtaskStatus === 1) {
      this.dingStatus = true
    }
    if (this.$store.getters.sDingtaskData !== '') {
      this.dingtaskInfo.data = JSON.parse(this.$store.getters.sDingtaskData)
    }
    if (this.$store.getters.sEmailData !== '') {
      this.emailInfo.data = JSON.parse(this.$store.getters.sEmailData)
    }
    if (this.emailInfo.data.smtpSec) {
      this.smtpDefault = this.emailInfo.data.smtpSec
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
    onEmailChange (emailStatus) {
      if (emailStatus === true) {
        // this.settingInfo.sEmailStatus = 1
        this.emailInfo.data.status = 1
      } else {
        // this.settingInfo.sEmailStatus = 0
        this.emailInfo.data.status = 0
      }
    },
    onDingChange (dingStatus) {
      if (dingStatus === true) {
        // this.settingInfo.sDingtaskStatus = 1
        this.dingtaskInfo.data.status = 1
      } else {
        // this.settingInfo.sDingtaskStatus = 0
        this.dingtaskInfo.data.status = 0
      }
    },
    smtpSeChange (e) {
      this.emailInfo.data.smtpSec = e
    },
    onCommit (e) {
      // console.log(JSON.stringify(this.emailInfo.data))
      // console.log(this.$store.getters.sEmailData)
      if (JSON.stringify(this.emailInfo.data) !== this.$store.getters.sEmailData) {
        this.changeStatus = false
        // console.log(JSON.stringify(this.emailInfo.data))
        // console.log(this.$store.getters.sEmailData)
        var bufE = Object.assign({}, this.postParams)
        bufE.sName = 'EMail'
        bufE.sData = JSON.stringify(this.emailInfo.data)
        bufE.sStatus = this.emailInfo.data.status
        try {
          this.SetSettingsInfo(bufE)
        } catch (err) {
          alert(err)
        }
      }
      if (JSON.stringify(this.dingtaskInfo.data) !== this.$store.getters.sDingtaskData) {
        this.changeStatus = false
        var bufD = Object.assign({}, this.postParams)
        bufD.sName = 'dingtask'
        bufD.sData = JSON.stringify(this.dingtaskInfo.data)
        bufD.sStatus = this.dingtaskInfo.data.status
        try {
          this.SetSettingsInfo(bufD)
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
