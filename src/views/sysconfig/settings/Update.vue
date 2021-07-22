<template>
  <a-result title="当前版本v0.1">
    <template>
      <img class="img" src="/u414.png"/>
    </template>
    <template #extra>
      <a-button key="console" type="primary">
        立即更新
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .img {
    width: 25%;
    height: 25%;
    margin:20px auto;
    vertical-align: middle;
    background: #ffffff;
    display: table-cell;
    }
</style>
