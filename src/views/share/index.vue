<template>
  <div>
    <a-page-header class="page-header" title="分享管理" >
      <s-table
        ref="table"
        size="default"
        rowKey="shareId"
        :columns="columns"
        :data="loadData"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
        <span slot="shareStatus"  slot-scope="text, record">
          <a-switch checked-children="开" un-checked-children="关" :checked="record.shareStatus | statusFilter" @change="onStatusChange(record)" />
        </span>
        <span slot="option" slot-scope="text, record" >
          <template>
            <a-button type="link" @click="handleDetail(record) ">
              查看
            </a-button>
            <a-drawer title="查看" :width="880" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" >
              <a-form :form="form" v-bind="currentInfo" layout="vertical" hide-required-mark>
                <a-descriptions bordered>
                  <a-descriptions-item label="分享ID" :span="3">
                    {{ currentInfo.shareId }}
                  </a-descriptions-item>
                  <a-descriptions-item label="接受人">
                    {{ currentInfo.username }}
                  </a-descriptions-item>
                  <a-descriptions-item label="邮箱" :span=2>
                    {{ currentInfo.email }}
                  </a-descriptions-item>
                  <a-descriptions-item label="状态">
                    <template v-if="currentInfo.shareStatus === 1" >
                      <a-badge status="success" text="分享中" />
                    </template>
                    <template v-else-if="currentInfo.shareStatus === 2" >
                      <a-badge status="error" text="分享结束" />
                    </template>
                  </a-descriptions-item>
                  <a-descriptions-item label="最后访问时间" :span=2>
                    {{ currentInfo.lastTime }}
                  </a-descriptions-item>
                  <a-descriptions-item label="备注" :span="3">
                    {{ currentInfo.shareNode }}
                  </a-descriptions-item>
                  <a-descriptions-item label="分享链接" :span="3">
                    <a :href="shareLink + currentInfo.shareId">{{shareLink}}{{currentInfo.shareId}}</a>
                  </a-descriptions-item>
                  <a-descriptions-item label="密文">
                    <a-textarea disabled v-model="currentInfo.secPasswd" :rows="8" />
                  </a-descriptions-item>
                </a-descriptions>
              </a-form>
              <div class="drawer-button">
                <a-button :style="{ marginRight: '8px' }" @click="onClose">
                  取消
                </a-button>
              </div>
            </a-drawer>
          </template>
        </span>
      </s-table>
    </a-page-header>
  </div>
</template>

<script>
import { STable } from '@/components'
// import store from 'store'
// import { getRoleList, getServiceList } from '@/api/manage'
import { getShareList, setShareItem } from '@/api/share'
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
                    title: '分享ID',
                    dataIndex: 'shareId',
                    key: 'shareId'
                  },
                  {
                    title: '接受人',
                    dataIndex: 'username',
                    key: 'username'
                  },
                  {
                    title: '保存次数',
                    dataIndex: 'saveCount',
                    key: 'saveCount'
                  },
                  {
                    title: '状态',
                    dataIndex: 'shareStatus',
                    key: 'shareStatus',
                    scopedSlots: { customRender: 'shareStatus' }
                  },
                  {
                    title: '过期时间',
                    dataIndex: 'endTime',
                    key: 'endTime'
                  },
                  {
                    title: '创建时间',
                    dataIndex: 'shareTime',
                    key: 'shareTime'
                  },
                  {
                    title: '操作',
                    dataIndex: 'option',
                    // width: '35%',
                    key: 'option',
                    scopedSlots: { customRender: 'option' }
                  }
              ]
    return {
      // create model
      form: this.$form.createForm(this),
      visible: false,
      shareLink: '',
      deleteStatus: false,
      queryParam: {},
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return getShareList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    // getRoleList({ t: new Date() })
    this.shareLink = this.$store.getters.siteDomain + '/publicshare/key?id='
  },
  filters: {
    statusFilter (status) {
      return statusMap[status].value
    }
  },
  methods: {
    onClose () {
      this.visible = false
    },
    onStatusChange (e) {
      var queryParam = e
      if (e.shareStatus === 2) {
        queryParam.shareStatus = 1
      } else {
        queryParam.shareStatus = 2
      }
      setShareItem(queryParam)
      this.ref()
    },
    handleDetail (record) {
      this.currentInfo = record
      this.visible = true
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
