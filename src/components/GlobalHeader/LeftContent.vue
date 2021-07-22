<template>
  <div :class="wrpCls">
    <a-tooltip placement="topLeft" :title="note">
      <a-progress :width="26" :percent=percent type="circle" :format="() => 'Q'"/>
    </a-tooltip>
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'LeftContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      quotainfo: {},
      percent: 0,
      note: '备份配额：已使用'
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.quotainfo = this.$store.getters.quotainfo
      this.percent = ((this.quotainfo.Used + 1) / this.quotainfo.Total) * 100
      this.percent = Number(this.percent.toFixed(3))
      this.note = '备份配额：已使用' + this.percent.toString() + '%'
    }, 1500)
  }
}
</script>
