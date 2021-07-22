<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="email"
    :sub-title="description">

    <template #extra>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">激活成功，返回首页</a-button>
    </template>

  </a-result>
</template>

<script>
  import { activateUser } from '@/api/users'
export default {
  name: 'Activate',
  data () {
    return {
      description: '',
      form: {}
    }
  },
  computed: {
    email () {
      // const v = this.form && this.form.email || 'xxx'
      return ``
    }
  },
  created () {
    var params = {
      id: this.$route.query.id,
      code: this.$route.query.code
    }
    this.activate(Object.assign(params))
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    },
    activate (queryParam) {
      return activateUser(queryParam)
        .then(res => {
          console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
