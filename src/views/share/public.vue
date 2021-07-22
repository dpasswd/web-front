<template>
  <div id="components-layout-demo-basic">
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="密钥分享"
    sub-title="dhpassword"
    />
    <a-card hoverable style="width: 450px;left: 40%;top:20px">
      <img
        slot="cover"
        alt="example"
        src="/t.gif"
      />
      <template slot="actions" class="ant-card-actions">
        <a-tooltip>
          <template slot="title">
            客户端下载,暂未开放
          </template>
          <a-icon key="download" type="download" />
        </a-tooltip>
        <a-tooltip>
          <template slot="title">
            查看(加密)分享信息
          </template>
          <a-badge :count="shareInfo.saveCount" :offset="[20,0]">
            <a-icon @click="handelEye" type="eye" />
            <!-- <a-button type="primary" shape="round" icon="eye" :size="size" /> -->
          </a-badge>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">
            保存到客户端并解密
          </template>
          <a :href="clientKey">
            <a-icon key="edit" type="cloud-download" />
          </a>
        </a-tooltip>
      </template>
      <a-card-meta title="备注" :description="shareInfo.shareNode">
        <a-avatar
          slot="avatar"
          src="/logo2.png"
        />
      </a-card-meta>
    </a-card>
    <a-drawer
      title="分享信息"
      placement="bottom"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <p>分享ID： {{shareInfo.shareId}}</p>
      <a-textarea placeholder="info" :value="shareInfo.secPasswd" :rows="4" />
      <a :href="clientKey">
        <a-button style="right:-90%;" type="primary" icon="download">
          保存到客户端
        </a-button>
      </a>
    </a-drawer>
  </div>
</template>

<script>
  import { getShareItem } from '@/api/share'
  export default {
  created () {
    this.shareId.id = this.$route.query.id
    this.getInfo(this.shareId)
    console.log(this.shareInfo)
  },
  data () {
    return {
      shareId: { id: '' },
      visible: false,
      shareInfo: {
        shareNode: '信息不存在',
        saveCount: 1,
        shareId: 'null',
        secPasswd: 'null'
      },
      clientKey: 'Hdpassword://',
      ldapStatus: false,
      changeStatus: true
    }
  },
  methods: {
    handelEye () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    getInfo (queryParam) {
      return getShareItem(queryParam)
        .then(res => {
          this.shareInfo = res.data
          this.clientKey = 'Hdpassword://' + res.data.secPasswd
      })
    }
  }
  }
</script>

<style>
.layout-basic {
  border: 1px solid rgba(187, 187, 187, 0.2);
  width: 80%;
  margin: 10px 10% 20px;
}
.header-text {
  font-size: 30px;
  margin: 30px -10px 20px;
}
</style>
