<template>
  <div id="components-layout-demo-basic">
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="密钥分享"
    sub-title="dhpassword"
    />
    <a-layout style="width: 80%;margin: 10px 10% 20px;">
      <a-layout>
        <a-layout-header>
          <p class="header-text"><a-icon type="lock"/> 密钥信息</p>
          <p >
            <a-icon type="mail" theme="twoTone"/>
            test@test.cn
            <a-icon type="calendar" theme="twoTone"/>
            2020-10-10 10:10:10
            <a-icon type="eye" theme="twoTone"/>
            <a-badge :count="99" style="margin-top: -20px;"/>
            <a-button style="left: 70%;">保存</a-button>
          </p>
        </a-layout-header>
        <a-layout-content>
          <a-card hoverable style="width: 300px">
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="setting" type="setting" />
              <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta title="Card title" description="This is the description">
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-card-meta>
          </a-card>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
</script>

<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header {
  background: #F9F9F9;
  height: 120px;
  color: rgb(89, 89, 89);
  text-align: left;
  line-height:100%;
}
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #317585;
  color: #fff;
  width: 300px;

}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(255, 255, 255);
  color: #fff;
  min-height: 420px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
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
