<template>
  <div>
    <a-page-header class="page-header" title="备份管理" >
      <a-row :gutter="24">
        <a-col :span="8">
          <a-button-group>
            <a-button type="primary" icon="setting"> 设置 </a-button>
            <a-button type="primary" icon="delete" @click="batchDel" > 批量删除 </a-button>
          </a-button-group>
        </a-col>
        <!--  第一期先不开放
        <a-col :span="6" :offset="8">
          <a-range-picker @change="pickerChange" />
        </a-col>
        <a-col :span="1" >
          <a-button type="primary">
            查询
          </a-button>
        </a-col>
        -->
      </a-row>
      <p></p>
      <s-table
        ref="table"
        size="default"
        rowKey="backupId"
        :columns="columns"
        :data="loadData"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
        <span slot="option" slot-scope="text, record" >
          <template>
            <a-button type="link" @click="handleDown(record)" >
              下载
            </a-button>
            <a-button type="link" @click="handleDel(record)" >
              删除
            </a-button>
            <a-button type="link" @click="handleRecover(record) ">
              恢复
            </a-button>
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
import { getBackupListByUserId, getBackupByBackupName, delBackupItem } from '@/api/backup'
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    this.del_id = []
    this.del_ids = []
    this.columns = [
                  {
                    title: '备份名',
                    dataIndex: 'backupName',
                    key: 'backupName'
                  },
                  {
                    title: '大小(KB)',
                    dataIndex: 'fileSize',
                    key: 'fileSize'
                  },
                  {
                    title: 'MD5',
                    dataIndex: 'fileMd5',
                    key: 'fileMd5'
                  },
                  {
                    title: '备份时间',
                    dataIndex: 'backupTime',
                    key: 'backupTime'
                  },
                  {
                    title: '最后下载时间',
                    dataIndex: 'lastTime',
                    key: 'lastTime'
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
      deleteStatus: false,
      queryParam: { userId: this.$store.getters.userInfo['userId'] },
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return getBackupListByUserId(Object.assign(parameter, this.queryParam))
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
  },
  methods: {
    pickerChange (date, dateString) {
      console.log(date, dateString)
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
            sel.del_id.push(record.backupId)
            var delParam = { backup_id: sel.del_id.join(',') }
            delBackupItem(delParam)
            sel.ref()
          },
          onCancel () {
            console.log('Cancel')
          }
        })
    },
    handleDown (record) {
      var downParam = { file_name: record.backupName }
      getBackupByBackupName(downParam).then(res => {
        this.saveFile(res, record.backupName)
        this.ref()
      }).catch(err => {
        this.$message.error(err)
      })
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
            var delParam = { backup_id: sel.del_ids.join(',') }
            delBackupItem(delParam)
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
    saveFile (data, name) {
      try {
        const blob = new Blob([data])
        if (window.navigator.msSaveOrOpenBlob) {
          // 兼容IE10
          navigator.msSaveBlob(blob, name)
        } else {
          //  chrome/firefox
          const aTag = document.createElement('a')
          aTag.download = name
          aTag.href = URL.createObjectURL(blob)
          aTag.click()
          URL.revokeObjectURL(aTag.href)
        }
      } catch (e) {
        console.log(e)
      }
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
