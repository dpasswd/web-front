<template>
  <div>
    <a-page-header class="page-header" title="用户管理" >
      <a-row :gutter="24">
        <a-col :span="8">
          <a-button-group>
            <a-button type="primary" icon="plus"> 邀请用户 </a-button>
            <a-button type="primary" icon="delete" @click="batchDel" > 批量删除 </a-button>
          </a-button-group>
        </a-col>
        <!--  第一期先不开放
        <a-col :span="8" :offset="8" >
          <a-input-search
          placeholder="请输入用户名/邮箱进行检索"
          enter-button="查询"
          size="large"
          @search="onSearch"
        />
        </a-col>
        -->
      </a-row>
      <p></p>
      <s-table
        ref="table"
        size="default"
        rowKey="userId"
        :columns="columns"
        :data="loadData"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
        <span slot="isAdmin"  slot-scope="text, record">
          <a-switch checked-children="启" un-checked-children="禁" :checked="record.isAdmin | roleFilter" @change="onRoleChange(record)" />
        </span>
        <span slot="status"  slot-scope="text, record">
          <a-switch checked-children="启" un-checked-children="禁" :checked="record.status | statusFilter" @change="onStatusChange(record)" />
        </span>
        <span slot="option" slot-scope="text, record" >
          <template>
              <a-button-group>
                <a-button type="link" @click="handleEdit(record)" >
                  编辑
                </a-button>
                <!--drawer start-->
                <a-drawer title="编辑" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" >
                  <a-form :form="form" v-bind="currentInfo" layout="vertical" hide-required-mark>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="昵称">
                          <a-input
                            v-decorator="[
                              'nickname',
                              {
                                rules: [{ required: true, message: '请输入昵称' }],
                              },
                            ]"
                            placeholder="请输入昵称"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="邮箱">
                          <a-input
                            v-decorator="[
                              'email',
                              {
                                rules: [{ required: true, message: '邮箱不能为空' }],
                              },
                            ]"
                            placeholder="请输入邮箱"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="电话">
                          <a-input
                            v-decorator="[
                              'phone',
                              {
                                rules: [{ required: /^1[3456789]d{9}$/, message: '请输入正确电话号码' }],
                              },
                            ]"
                            placeholder="请输入电话号码"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="存储配额">
                          <a-input
                            v-decorator="[
                              'quota',
                              {
                                rules: [{ required: true, message: '存储配额不能为空' }],
                              },
                            ]"
                            placeholder="请输存储配额"
                            suffix="MB"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col>
                        <a-form-item label="公钥">
                          <a-textarea
                            v-decorator="[
                              'publicKey',
                              {
                                rules: [{ required: false, message: '请输入公钥' }],
                              },
                            ]"
                            placeholder="请输入公钥"
                            :auto-size="{ minRows: 6, maxRows: 20 }"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                  <div class="drawer-button">
                    <a-button :style="{ marginRight: '8px' }" @click="onClose">
                      取消
                    </a-button>
                    <a-button type="primary" @click="onCommit">
                      提交
                    </a-button>
                  </div>
                </a-drawer>
                <!--drawer end-->
                <a-button type="link" @click="handleDel(record)" >
                  删除
                </a-button>
              </a-button-group>
          </template>
        </span>
      </s-table>
    </a-page-header>
  </div>
</template>

<script>
import { STable } from '@/components'
import { adminSetUserInfo, delUsers, getAllUser } from '@/api/users'

const statusMap = {
      1: {
        status: 1,
        value: true
      },
      2: {
        status: 2,
        value: false
      }
    }
const roleMap = {
      1: {
        isAdmin: 1,
        value: true
      },
      2: {
        isAdmin: 2,
        value: false
      }
    }
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    this.del_id = []
    this.del_ids = []
    this.currentInfo = {}
    this.columns = [
                  {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username'
                  },
                  {
                    title: '昵称',
                    dataIndex: 'nickName',
                    key: 'nickName'
                  },
                  {
                    title: '邮箱',
                    dataIndex: 'email',
                    key: 'email'
                  },
                  {
                    title: '最后登录IP',
                    dataIndex: 'lastLoginIp',
                    key: 'lastLoginIp'
                  },
                  {
                    title: '最后登录时间',
                    dataIndex: 'lastLogTime',
                    key: 'lastLogTime'
                  },
                  {
                    title: '管理员',
                    dataIndex: 'isAdmin',
                    key: 'isAdmin',
                    scopedSlots: { customRender: 'isAdmin' }
                  },
                  {
                    title: '账号状态',
                    dataIndex: 'status',
                    key: 'status',
                    scopedSlots: { customRender: 'status' }
                  },
                  {
                    title: '操作',
                    dataIndex: 'option',
                    // width: '25%',
                    key: 'option',
                    scopedSlots: { customRender: 'option' }
                  }
              ]
    return {
      // create model
      form: this.$form.createForm(this),
      visible: false,
      deleteStatus: false,
      queryParam: { },
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return getAllUser(Object.assign(parameter, this.queryParam))
          .then(res => {
            this.localDataSource = res.data
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    // getRoleList({ t: new Date() })
  },
  filters: {
    statusFilter (status) {
      return statusMap[status].value
    },
    roleFilter (isAdmin) {
      return roleMap[isAdmin].value
    }
  },
  methods: {
    onClose () {
      this.visible = false
    },
    onCommit () {
      console.log(this.form.getFieldValue('nickname'))
      // this.visible = false
      this.form.validateFields(err => {
        if (!err) {
          this.queryParam = {
            userId: this.currentInfo.userId,
            nickName: this.form.getFieldValue('nickname'),
            email: this.form.getFieldValue('email'),
            telephone: this.form.getFieldValue('phone'),
            Quota: this.form.getFieldValue('quota'),
            publicKey: this.form.getFieldValue('publicKey')
          }
          adminSetUserInfo(this.queryParam)
          console.log(this.queryParam)
          this.visible = false
        }
      })
      this.ref()
    },
    onRoleChange (e) {
      var queryParam = e
      if (e.roleId === 2) {
        queryParam.isAdmin = 1
        queryParam.roleId = 1
      } else {
        queryParam.isAdmin = 2
        queryParam.roleId = 2
      }
      adminSetUserInfo(queryParam)
      this.ref()
    },
    onStatusChange (e) {
      var queryParam = e
      if (e.status === 2) {
        queryParam.status = 1
      } else {
        queryParam.status = 2
      }
      adminSetUserInfo(queryParam)
      this.ref()
    },
    onSearch (value) {
      console.log(value)
    },
    handleDel (record) {
      const sel = this
      this.$confirm({
        title: '真的要删除吗？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          sel.del_id = []
          sel.del_id.push(record.userId)
          var delParam = { userId: sel.del_id.join(',') }
          delUsers(delParam)
          sel.ref()
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    handleEdit (record) {
      this.currentInfo = record
      setTimeout(() => {
        this.form.setFieldsValue({
          nickname: record.nickName,
          email: record.email,
          phone: record.telephone,
          quota: record.Quota,
          publicKey: record.publicKey
        })
      }, 100)
      this.visible = true
    },
    batchDel () {
      if (this.del_ids.length === 0) {
        this.$message.warning('选择列表不能为空')
      } else {
        const sel = this
        this.$confirm({
          title: '真的要删除吗？',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            var delParam = { userId: sel.del_ids.join(',') }
            delUsers(delParam)
            sel.ref()
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      }
    },
    ref () {
      setTimeout(() => {
        this.$refs.table.refresh()
      }, 300)
    },
    handleRecover () {
      this.$message.warning('此功能服务器端暂未开放,请前往客户端操作')
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.del_ids = this.selectedRowKeys
    },
    onChange (e) {
      console.log(e)
    }
  }
}
</script>

<style>
  #components-button-demo-button-group > h4 {
    margin: 16px 0;
    font-size: 14px;
    line-height: 1;
    font-weight: normal;
  }
  #components-button-demo-button-group > h4:first-child {
    margin-top: 0;
  }
  #components-button-demo-button-group .ant-btn-group {
    margin-right: 8px;
  }
  .drawer-button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;
    z-index: 1;
  }
</style>
